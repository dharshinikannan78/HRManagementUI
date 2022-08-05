import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {


  EmployeeId: string = localStorage.getItem('customerId');

  applyOnLeave: FormGroup = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    employeeId: new FormControl(this.EmployeeId)
  });

  constructor(private router: Router, private api: ApiServiceService) {
  }


  ngOnInit(): void {
    console.log(this.EmployeeId, 'helo')
  }


  applyLeave(params: any) {
    this.api.applyLeaveOn(params).subscribe(data => {
      console.log(data, 'data')
    });
  }
}
