import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';
import { Injectable } from '@angular/core';
import { keyframes } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  EmployeeId: string = localStorage.getItem('EmployeeId');
  AttendanceId:string=localStorage.getItem('AttendanceId');
 
  attDetails: any;
hour:any;
minute:string;
second:string;
AMPM:any;
check:boolean=true;


addAttendance: FormGroup = new FormGroup({
  date: new FormControl(moment().format()),
  inTime: new FormControl(moment().format()),
  employeeId:new FormControl(this.EmployeeId)
});

updateAttendance: FormGroup = new FormGroup({
  attendanceId:new FormControl(this.AttendanceId),
  outTime: new FormControl(moment().format()),
  employeeId:new FormControl(this.EmployeeId)
});
  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
    this.getAttendanceDetail();
    console.log(this.second,"second")
    setInterval(() => {
      const date=new Date();
      this.updateDate(date);
    });
  }

  ngOnInit(): void {
    
   if(localStorage.getItem('checkIn'+this.EmployeeId) != null) {
    let test = localStorage.getItem('checkIn' + this.EmployeeId);
    this.check = JSON.parse(test);
    
   }
   
    
 
  }
  updateDate(date:Date){
    const hours=date.getHours();
    this.AMPM=hours>=12?'PM':'AM';
    this.hour=hours%12;
    this.hour=this.hour?this.hour:12;
    this.hour=this.hour<10?'0' +this.hour:this.hour;
    const minutes=date.getMinutes();
    this.minute=minutes<10?'0' +minutes:minutes.toString();
    const seconds=date.getSeconds();
    this.second=seconds<10?'0' +seconds:seconds.toString()  ;
  }
  
  
 attendanceDetails(params: any) {
    Swal.fire({
      title: "Are you sure want to CheckIn ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckIn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addAttendance(params).subscribe((data:any) => {
         
     localStorage.setItem("AttendanceId", data.attendanceId);
          this.check=!this.check
          localStorage.setItem('checkIn'+this.EmployeeId, JSON.stringify(this.check));       
      Swal.fire({
        text: 'CheckIn Sucessfully!',
        icon: 'success',
        timer: 1000
      });
     
     }, (error: Response) => {
        if (error.status === 400) {
          Swal.fire({
            text: 'User Already Checkin Today',
            icon: 'error',
            timer: 1000
          });
        }
          });
        }
        
        });
}
    updateattendanceDetails(params:any) {
      
      Swal.fire({
        title: "Are you sure want to CheckOut ?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'CheckOut'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.updateAttendance(params).subscribe(data => {
           
            this.check=!this.check
            localStorage.setItem('checkIn'+this.EmployeeId, JSON.stringify(this.check));

        Swal.fire({
          text: 'CheckOut Sucessfully!',
          icon: 'success',
          timer: 1000
        });
     this.getAttendanceDetail();
      });
        }
  });
     }
  getAttendanceDetail() {
    this.api.getAttendanceDetails(this.EmployeeId).subscribe(data => {
      console.log(data, "fgfgdfg");
      this.attDetails = data
      console.log(this.attDetails, "this.attDetails");
    });


  }
}