import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getBootstrapBaseClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ApiServiceService } from '../service/api-service.service';



@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef


  leaveDetails: any;
  isShow: string;
  showModal: boolean = false;
  employeeLeaveDetails:any;
  EmployeeId: string = localStorage.getItem('customerId');
  duration: string;
  applyOnLeave: FormGroup = new FormGroup({
    Duration: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    employeeId: new FormControl(1)
  });

  constructor(private router: Router, private api: ApiServiceService) {
  }


  ngOnInit(): void {
    this.getLeaveDetails();
  }
  getLeaveDetail(data: any) {
    console.log(data, 'geetha')
    this.showModal = true;
    this.employeeLeaveDetails = data;

  }
  changeDuration(params: any) {
    let elements = document.getElementsByClassName("forSelectMenu");
    if (params.target.value != 'Day') {
      console.log(elements);
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'datetime-local');
      }
    }
    else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'date');
      }
    }


  }

  getLeaveDetails() {
    this.api.getLeaveDetails().subscribe(data => {
      this.leaveDetails = data;
      console.log(data, 'leave')
    })
  }

  applyLeave(params: any) {
    this.api.applyLeaveOn(params).subscribe(data => {
      console.log(data, 'data');
      console.log("after the await");
      this.getLeaveDetails();
    });
    this.closeModal.nativeElement.click();
  }
}
