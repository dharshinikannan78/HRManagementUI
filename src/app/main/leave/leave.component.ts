import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
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
  isPopUp: boolean = false;
  leaveDetails: any;
  isShow: string;

  showModal: boolean = false;
  employeeLeaveDetails: any;

  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')

today:string = moment().format('YYYY-MM-DD');

  duration: string;

  applyOnLeave: FormGroup = new FormGroup({
    leaveDay: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    approvalStatus: new FormControl('', Validators.required),
    employeeId: new FormControl(this.EmployeeId)
  });
  updateLeaveForm: FormGroup = new FormGroup({
    
    employeeId: new FormControl('', Validators.required),
    leaveId: new FormControl('', Validators.required),
    approvalStatus: new FormControl('', Validators.required),
    finalApproval:new FormControl('',Validators.required),
  });

  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
  }

  ngOnInit(): void {
    this.getLeaveDetails();
    console.log(this.today,"today");
  }

  getLeaveDetail(data: any) {
    console.log('dataEmployee')
    console.log(this.Role, 'this.userService.Role')
    if (this.Role == "Admin") {
      console.log('userService')
      this.showModal = true;
      console.log(data, 'geetha')
      this.employeeLeaveDetails = data;
      console.log(this.employeeLeaveDetails, 'employeeLeaveDetails')
    } else if (this.Role == "Employee") {
      console.log('Employee')

      this.showModal = false;

    }
  }

  changeDuration(params: any) {
    let elements = document.getElementsByClassName("forSelectMenu");
    if (params.target.value == 'Day'||params.target.value == 'HalfDay') {
      console.log(elements);
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'date');
      }
    }
    else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'datetime-local');
      }
    }
  }

  getLeaveDetails() {
    this.api.getLeaveDetails(this.EmployeeId).subscribe(data => {
      console.log(data, 'helo')
      this.leaveDetails = data
    });
  }

  applyLeave(params: any) {

    this.api.applyLeaveOn(params).subscribe((data) => {
      console.log(data, 'data');
      console.log("after the await");
      Swal.fire({
        text: 'Leave Applied Sucessfully!',
        icon: 'success',
        timer: 1000
      });
      this.getLeaveDetails();
    },(error: Response) => {
      if (error.status === 400) {
        Swal.fire({
          text: 'Already Applied for leave',
          icon: 'error',
          timer: 3000
        });
      }
   
      if (error.status === 404) {
        Swal.fire({
          text: 'User Already Checkin Today ',
          icon: 'error',
          timer: 3000
        });
      }
   
    if (error.status === 403) {
      Swal.fire({
        text: 'Select Valid Date ',
        icon: 'error',
        timer: 3000
      });
    }
  });


  }


  approvalStatus(event: any) {
    console.log(event, 'event')
  }

  // updateLeaveDetails(updateLeaveForm: any) {
  //   console.log('dataEmployee')
  //   this.api.updateLeaveDetails(updateLeaveForm).subscribe(data => {
  //     console.log(data, 'dataEmployee')
  //     Swal.fire({
  //       text: 'Updated Sucessfully!',
  //       icon: 'success',
  //       timer: 1000
  //     });
  //     this.showModal = false;
  //     location.reload();

  //   });
  // }
  updateLeaveDetails(id:any,updateLeaveForm: any) {
    console.log('dataEmployee')
    this.api.updateLeaveDetails(this.EmployeeId,updateLeaveForm).subscribe(data => {
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