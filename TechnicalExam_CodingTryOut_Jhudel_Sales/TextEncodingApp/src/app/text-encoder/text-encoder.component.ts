import { Component } from '@angular/core';
import { TextEncoderService } from './text-encoder.service';
import { Subject } from 'rxjs';
import { EncryptionService } from '../encryption.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { LoginComponent } from '../login/login.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-encoder',
  templateUrl: './text-encoder.component.html',
  styleUrls: ['./text-encoder.component.css']
})
export class TextEncoderComponent {

  //--------------------------------------------------------------------------------------------------------------------------
  data:any;
  selectedItem: any = null; // Store the selected item for editing
  editedItem: any = null; // Store a copy of the item being edited
  isEditing: boolean = false; // Track whether an item is in edit mode
  buttonClickSubscription: Subscription = new Subscription();

  dateForm: FormGroup;
  dateControl: FormControl;
  EmployeeType: any = 'regular';

  constructor(
    private textEncoderService: TextEncoderService,
    private encryptionService: EncryptionService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private fb: FormBuilder
    ) 
    {
      this.buttonClickSubscription = this.sharedService.onButtonClick().subscribe(async () => {
        await this.getListOfEmployees();
      });

      this.dateControl = new FormControl('');
      this.dateForm = this.fb.group({
        date: this.dateControl,
      });
  
      this.dateControl.valueChanges.subscribe((newValue) => {
        this.onSubmit();
      });
    }

  async ngOnInit(){
    await this.getListOfEmployees();
  }

  ngOnDestroy() {
    if (this.buttonClickSubscription) {
      this.buttonClickSubscription.unsubscribe();
    }
  }
  
  onSubmit() {
    if (this.dateForm.valid) {
      this.editedItem.BirthDate = this.dateControl.value;
      console.log('Selected Date:', this.dateControl.value);
    }
  }
  async getListOfEmployees(){
    const getData = await this.textEncoderService.getListOfEmployees().toPromise();
    this.data = Object.values(getData.userBalance);
    console.log(getData);
  }

  handleButtonClick(item: any) {
    console.log("Button clicked for item:", item);
  }

  editItem(item: any) {
    this.selectedItem = item;
    this.editedItem = { ...item };
    this.isEditing = true;
  }

  async saveChanges(item: any) {
    try{
      item.fullName = this.editedItem.FullName;
      item.birthDate = this.editedItem.BirthDate;
      item.employeeType = this.editedItem.EmployeeType;

      const response = await this.textEncoderService.EditEmployees(item.employeeId, this.editedItem.FullName, this.editedItem.BirthDate, this.editedItem.Tin, this.editedItem.EmployeeType).toPromise();
      
      this.editedItem.EmployeeId = '';
      this.editedItem.FullName = '';
      this.editedItem.BirthDate = '';
      this.editedItem.EmployeeType = '';
  
      this.selectedItem = null;
      await this.getListOfEmployees();
    }
    catch(e)
    {
      console.log("error");
    }

  }

  cancelEdit() {
    this.selectedItem = null;
    this.editedItem = null;
    this.isEditing = false;
  }

  async deleteItem(item: any) {
  
    const response = await this.textEncoderService.DeleteEmployees(item.employeeId).toPromise();
    await this.getListOfEmployees();
  }

  Calculate(item:any) {
    const modalRef = this.modalService.open(MyModalComponent);
        // Access the component instance and set the 'item' property
        console.log(item);
        const modalComponentInstance: MyModalComponent = modalRef.componentInstance;
        modalComponentInstance.item = item;
  }
  async addEmployees() {
    const modalRef = this.modalService.open(RegisterModalComponent);
    const modalOptions: NgbModalOptions = {
      size: 'lg' 
    };
  }
}
