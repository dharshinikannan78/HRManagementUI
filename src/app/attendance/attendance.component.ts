import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  addAttendance: FormGroup = new FormGroup({
    date: new FormControl(''),
    inTime: new FormControl(''),
    outTime: new FormControl(''),
    status: new FormControl(''),
   
  });
  attDetails: any;

  constructor(private router: Router, private api: ApiServiceService) {
   this.getAttendanceDetail();
  }

  ngOnInit(): void {
    console.log(this.addAttendance.value.inTime, "time")
  }

  attendanceDetails(params: any) {console.log(this.addAttendance.value.inTime, "time")
   
    this.api.addAttendance(params).subscribe(data => {
      console.log(data, 'attendance');
        });
  }
  getAttendanceDetail(){
    this.api.getAttendanceDetails().subscribe(data =>{
      console.log(data,"fgfgdfg");
      this.attDetails=data

    });
  }
 
}
