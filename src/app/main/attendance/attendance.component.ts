import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';


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


  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
    this.getAttendanceDetail();
  }

  ngOnInit(): void {

  }

  attendanceDetails(params: any) {

    this.api.addAttendance(params).subscribe(data => {
      console.log(data, 'attendance');
      this.addAttendance.reset();
    });
    Swal.fire({
      text: 'Updated Sucessfully!',
      icon: 'success',
      timer: 900
    });
    // this.showModal = false;
    location.reload();
  }
  getAttendanceDetail() {
    this.api.getAttendanceDetails(this.EmployeeId).subscribe(data => {
      console.log(data, "fgfgdfg");
      this.attDetails = data
      console.log(this.attDetails, "this.attDetails");
    });


  }


}