import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  EmployeeId: any = localStorage.getItem('EmployeeId');
  AttendanceId: any = localStorage.getItem('AttendanceId');
  InTime: any = localStorage.getItem('InTime');
  attDetails: any;
  hour: any;
  minute: string;
  second: string;
  AMPM: any;
  check: boolean = true;

  addAttendance: FormGroup = new FormGroup({
    inTime: new FormControl(moment().format()),
    employeeId: new FormControl(this.EmployeeId)
  });

  updateAttendance: FormGroup = new FormGroup({
    attendanceId: new FormControl(this.AttendanceId),
    inTime: new FormControl(this.InTime),
    outTime: new FormControl(moment().format()),
    employeeId: new FormControl(this.EmployeeId)
  });
  attendace: any;
  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
    this.getAttendanceDetail();
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);
    // this.attendanceDetails('')
    this.api.allEmployeeAttendance().subscribe(data => {
      this.attendace = data;
      console.log(this.attendace, 'dat')
    })
  }
  updateDate(date: Date) {
    const hours = date.getHours();
    this.AMPM = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  attendanceDetails(params: any) {
    // console.log(params, 'params')
    // this.userService.AttendanceId = params;
    this.api.addAttendance(params).subscribe((data: any) => {
      console.log(data, 'attendance');
      //  localStorage.setItem("AttendanceId", data.attendanceId);
      this.userService.AttendanceId = data.attendanceId;
      this.userService.InTime = data.inTime;
      console.log(this.userService.AttendanceId, 'this.userService.AttendanceId')

      this.check = !this.check
    });

  }

  updateattendanceDetails(params: any) {
    // this.AttendanceId =  
    console.log(this.userService.AttendanceId, 'this.userService.AttendanceId')
    this.api.updateAttendance(params).subscribe((data: any) => {
      console.log(data , 'updattendance');
      data.attendanceId = this.userService.AttendanceId;
      // data.inTime = this.userService.InTime;
      console.log(data , 'updattendance');
      // ...at
      // this.userService.AttendanceId = data.attendanceId;
      this.check = !this.check
    });
    Swal.fire({
      text: 'Updated Sucessfully!',
      icon: 'success',
      timer: 900
    });
    // this.showModal = false;
    // location.reload();

  }
  getAttendanceDetail() {
    this.api.getAttendanceDetails(this.EmployeeId).subscribe(data => {
      console.log(data, "fgfgdfg");
      this.attDetails = data
      console.log(this.attDetails, "this.attDetails");
    });


  }
}