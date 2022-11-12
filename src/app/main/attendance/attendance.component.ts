import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  [x: string]: any;

  attendanceDetails: any;
  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')
  isSuperUser: boolean;
  isEmployee: boolean = true;
  isTeamLead: boolean = true;
  isManager: boolean = true;
  isAdmin: boolean = true;
  myAttendance: any;

  constructor(private api: ApiServiceService, private user: UserServiceService) {


  }

  ngOnInit(): void {
    this.check();
    this.getMyAttendance();
    this.getAttendanceDetails();
    this.isSuperUser = this.user.getRole();

    console.log(this.isSuperUser, "hekoo")
  }
  check() {
    if (this.user.Role == "Employee") {

      this.isEmployee = !this.isEmployee;
    }
    if (this.user.Role == "TeamLead") {

      this.isTeamLead = !this.isTeamLead;
    }
    if (this.user.Role == "Manager") {

      this.isManager = !this.isManager;
    }
    if (this.user.Role == "Admin") {
      this.isAdmin = !this.isAdmin;
    }
  }
  getAttendanceDetails() {
    this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
      this.attendanceDetails = data;
      console.log(data, "hello from morning")
    });
  }
  getMyAttendance() {
    this.api.getMyAttendance(this.EmployeeId).subscribe(datas => {
      this.myAttendance = datas;
      console.log(this.myAttendance,"myatt");
    })
  }
}



