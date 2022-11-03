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
  isEmployee: boolean = true;
  isTeamLead: boolean = true;
  isManager: boolean = true;
  isAdmin: boolean = true;
  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')
  leaveData: any;
  constructor(private router: Router, private api: ApiServiceService) { }

  ngOnInit(): void {
    this.getAttendanceDetails();
  }

  getAttendanceDetails() {
    this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
      this.attendanceDetails = data;
    });
  }
}



