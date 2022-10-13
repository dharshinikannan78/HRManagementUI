import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {


  attendanceDetails: any;
  attendanceDetail: any;

  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')

  constructor(private router: Router, private api: ApiServiceService) { }

  ngOnInit(): void {

    this.getAttendanceDetails();
  }
  getAttendanceDetails() {
    if (this.Role == "Admin") {
      this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
        this.attendanceDetails = data;
        console.log(data, 'data')

      });

    } else if (this.Role == "Employee" || this.Role == "Manager" || this.Role == "TeamLead") {
      this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
        this.attendanceDetails = data;
        console.log(data, 'data')
      });

    }

  }
}



