import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  EmployeeId: string = localStorage.getItem('employeeId');
  AttendanceId:string=localStorage.getItem('AttendanceId')
  attDetails: any;
hour:any;
minute:string;
second:string;
AMPM:any;
check:boolean=true;

addAttendance: FormGroup = new FormGroup({
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
  }

  ngOnInit(): void {
    setInterval(() => {
      const date=new Date();
      this.updateDate(date);
    },1000);

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
   this.api.addAttendance(params).subscribe((data:any) => {
      console.log(data, 'attendance');
 localStorage.setItem("AttendanceId", data.attendanceId);
    //  this.userService.AttendanceId=data.attendanceId;
      this.check=!this.check
    });
  }
    updateattendanceDetails(params:any) {
      this.api.updateAttendance(params).subscribe(data => {
        console.log(data, 'updattendance');
        this.check=!this.check
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