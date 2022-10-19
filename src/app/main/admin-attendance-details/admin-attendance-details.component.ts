import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-admin-attendance-details',
  templateUrl: './admin-attendance-details.component.html',
  styleUrls: ['./admin-attendance-details.component.scss']
})

export class AdminAttendanceDetailsComponent implements OnInit {
  details: any = [];
  filterAttendanceDetails: any = [];
  filterLeaveDetails: any = [];
  EmployeeId: any = localStorage.getItem("EmployeeId");
  from: string = moment().format('YYYY-MM-DD');
  to: string = moment().format('YYYY-MM-DD');
  employeName: any;
  user: any;
  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.LeaveFilter();
    this.getEmployeeName()
  }

  LeaveFilter() {
    let payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'User': this.user
    }
    this.api.getFilter(this.EmployeeId, payload).subscribe(data => {
      this.details = data;
      console.log(data, "addten =nce filter")
      this.filterAttendanceDetails = this.details.attendanceFilter;
      console.log(this.filterAttendanceDetails, "addten =nce filter")
      this.filterLeaveDetails = this.details.leaveFilter;
    })
  }

  getEmployeeName() {
    this.api.getallEmployeesName().subscribe(data => {
      console.log(data, 'nameData')
      this.employeName = data;
      console.log(this.employeName, 'name geetha paithiyam')
    });
  }
}
