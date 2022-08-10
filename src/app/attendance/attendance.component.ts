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
  EmployeeId: string = localStorage.getItem('employeeId');
  addAttendance: FormGroup = new FormGroup({
    
    inTime: new FormControl('', Validators.required),
    outTime: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    employeeId: new FormControl(this.EmployeeId)
   
  });
  attDetails: any;

  constructor(private router: Router, private api: ApiServiceService) {
   this.getAttendanceDetail();
  }

  ngOnInit(): void {
    
  }

  attendanceDetails(params: any) {
   
    this.api.addAttendance(params).subscribe(data => {
      console.log(data, 'attendance');
      this.addAttendance.reset();
        });
  }
  getAttendanceDetail(){
    this.api.getAttendanceDetails().subscribe(data =>{
      console.log(data,"fgfgdfg");
      this.attDetails=data

    });
  }
 
}
