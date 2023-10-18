import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  item:any;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  onClickButton(): void {
    // Notify the shared service that the button has been clicked
    this.sharedService.notifyButtonClick();
  }

}
