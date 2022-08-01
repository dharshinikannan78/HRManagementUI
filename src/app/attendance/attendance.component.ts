import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendanceonEmploayee: FormGroup = new FormGroup({
    date: new FormControl(''),
    inTime: new FormControl(''),
    outTime: new FormControl(''),
    status: new FormControl(''),
    // workDuration: new FormControl('', Validators.required),
    // overTimeDuration: new FormControl('', Validators.required),


  });

  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
  }

  getEmployeeAttance() {

  }
 
}
