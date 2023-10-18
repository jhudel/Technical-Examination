import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {
  item: any; 
  employeeType: string = 'regular'; // Default selection
  basicSalary: number = 0;
  absences: number = 0;
  ratePerDay: number = 0;
  workedDays: number = 0;
  calculatedSalary: number | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.item);
  }

  
  closeModal() {
    this.activeModal.close('Modal closed');
  }


  calculateSalary() {
    if (this.employeeType === 'regular') {
      const basicSalary = this.basicSalary;
      const absentDays = this.absences;
      const taxRate = 0.12;
      const netSalary = basicSalary - (basicSalary / 22) - (basicSalary * taxRate);
      this.calculatedSalary = netSalary;
    }
    else if (this.employeeType === 'contractual') {
      const ratePerDay = this.ratePerDay;
      const workedDays = this.workedDays;
      this.calculatedSalary = ratePerDay * workedDays;
    }
  }

}
