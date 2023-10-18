import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';
import { EncryptionService } from '../encryption.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //new users
  newUserFullName: string = '';
  newUserBirthDate: any = null;
  newUserTin: any = null;
  newUserEmployeeType:any = null;
  isAllFieldsComplete: boolean = false;
  encodedString: string = '';
  userData:boolean = false;
  mainText:string = '';
  subText:string = '';
  dateForm: FormGroup;
  dateControl: FormControl;
  EmployeeType: any = 'regular';


  constructor(private sharedService: SharedService, 
    private router: Router, 
    private encryptionService: EncryptionService,
    private appService: AppServiceService,
    private fb: FormBuilder) 
    {
      this.dateControl = new FormControl('');
      this.dateForm = this.fb.group({
        date: this.dateControl,
      });
  
      this.dateControl.valueChanges.subscribe((newValue) => {
        this.onSubmit();
      });
  }


  ngOnInit(){
    sessionStorage.removeItem('userName');
  }

  onClickButton(): void {
    this.sharedService.notifyButtonClick();
  }

  onSubmit() {
    if (this.dateForm.valid) {
      this.newUserBirthDate = this.dateControl.value;
      console.log('Selected Date:', this.dateControl.value);
    }
  }
  

  async registerUser(){
    
    if(this.newUserFullName && this.newUserBirthDate && this.newUserTin){
      console.log(this.newUserFullName);
      //call api for backend to save data
      const registerUser = await this.appService.registerNewUser(this.newUserFullName, this.newUserBirthDate, this.newUserTin, this.EmployeeType).toPromise();
      
      if(registerUser.successMessage.successMessage){
        this.onClickButton();
      }
      
      //save session
      this.encodedString = this.encryptionService.encodeString(this.newUserFullName);
      sessionStorage.setItem('userName', this.encodedString);
      
      this.isAllFieldsComplete = false;
      this.newUserFullName= "";
      this.newUserBirthDate = null;
      this.newUserTin = "";
      this.dateForm.get('date')?.reset(null);

      //enable success text
      this.mainText = registerUser.successMessage.successMessage;
      this.subText = registerUser.successMessage.successSubMessage;

    }
    else{
      this.isAllFieldsComplete = true;
    }
  }
}
