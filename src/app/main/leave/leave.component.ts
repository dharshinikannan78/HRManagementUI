import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';

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
  employeeLeaveDetails: any;

  EmployeeId: string = localStorage.getItem('employeeId')

  duration: string;
  
  applyOnLeave: FormGroup = new FormGroup({
    Duration: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    employeeId: new FormControl(1)
  });
  updateLeaveForm: FormGroup = new FormGroup({
    // startDate: new FormControl('', Validators.required),
    employeeId: new FormControl('', Validators.required),
    leaveId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    appliedOn: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    noOfDays: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    approvalStatus: new FormControl(''),
  });

  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
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
    this.api.getLeaveDetails(this.EmployeeId).subscribe(data => {
      console.log(data, 'helo')
      this.leaveDetails = data
      if (this.userService.Role == "Employee") {
        this.leaveDetails = Array.of(this.leaveDetails)
      }
    });
  }

  applyLeave(params: any) {
    this.api.applyLeaveOn(params).subscribe(data => {
      console.log(data, 'data');
      console.log("after the await");
      this.getLeaveDetails();
    });
    this.closeModal.nativeElement.click();
  }
  approvalStatus(event: any) {
    console.log(event, 'event')

  }
  updateLeaveDetails(updateLeaveForm: any) {
    console.log('dataEmployee')

    this.api.updateLeaveDetails(updateLeaveForm).subscribe(data => {
      console.log(data, 'dataEmployee')
      Swal.fire({
        text: 'Updated Sucessfully!',
        icon: 'success',
        timer: 1000
      });
      this.showModal = false;
      location.reload();
    });
  }
}

