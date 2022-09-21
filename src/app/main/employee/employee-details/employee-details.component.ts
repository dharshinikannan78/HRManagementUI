import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ComponentFactoryResolver
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
// calendar
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import * as moment from 'moment';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: "#28ba62",
    secondary: "#2dd36f1f"
  }
};

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeDetail: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    designation: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    emailId: new FormControl(''),
    dob: new FormControl(''),
    attachmentIds: new FormControl(''),
    joiningDate: new FormControl(''),
  });

  customStyle = {
    objectFit: "cover",
    cursor: "pointer"
  };
  isData: any = [];
  oneEmployee: boolean = true;
  employee: any
  attd: any;
  isEditTable: boolean = false;
  firstName: any;
  lastName: any;
  showModal: boolean = false;
  employeeDetails: any;
  attachment: any
  isNavOpen: boolean = true;
  taskDetails: any;
  UserId: string = localStorage.getItem('userId');
  isShown: boolean = true;
  EmployeeId: any = localStorage.getItem("EmployeeId");
  AttendanceId: any;
  // InTime: any = localStorage.getItem('InTime');
  attDetails: any;
  hour: any;
  minute: string;
  second: string;
  AMPM: any;
  check: boolean = true;
  AttendanceIds: any = [];
  InTime: any = [];
  addAttendance: FormGroup = new FormGroup({
    date: new FormControl(moment().format()),
    inTime: new FormControl(moment().format()),
    employeeId: new FormControl(this.EmployeeId)
  });




  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userService: UserServiceService,
  ) {
    // this.AttendanceId = localStorage.getItem('AttendanceId')
    // this.attendanceDetails('')
    // this.api.allEmployeeAttendance().subscribe(data => {
    //   this.attendace = data;
    //   console.log(this.attendace, 'dat')
    // })

    this.getAllDetails('');
    console.log("came");
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   const date = new Date();
    //   this.updateDate(date);
    // }, 1000);

    // if (localStorage.getItem('checkIn' + this.EmployeeId)) {
    //   console.log( this.EmployeeId, 'first')
    //   let test = localStorage.getItem('checkIn' + this.EmployeeId);
    //   console.log( test, 'second')

    //   this.check = JSON.parse(test);
    // }
  }
  getAllDetails(params: any) {
    this.api.getUserDetails(this.EmployeeId, params).subscribe((data: any) => {
      console.log(data, "data for accordion")
      if (this.userService.Role == "Admin") {
        this.isData = data;

      }
      if (this.userService.Role == "TeamLeader" || this.userService.Role == "TeamMember") {
        this.oneEmployee = false;
        console.log(this.oneEmployee, "wonenknkn")
        this.isData = Array.of(this.isData);

        console.log(this.isData, "while one emp");
      }
      this.api.getTaskDetailById(this.EmployeeId).subscribe(data => {
        this.taskDetails = data;
      })
    });
  }
}
