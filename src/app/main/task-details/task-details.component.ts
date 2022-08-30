import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  isOpenTask: boolean = false;
  UserId: any = localStorage.getItem('UserId');
  Role: string = localStorage.getItem('Role')
  isTaskDetails: any;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  taskDetails: FormGroup = new FormGroup({
    projectTitle: new FormControl(''),
    summary: new FormControl(''),
    // status: new FormControl(''),
    assigingId: new FormControl(this.EmployeeId),
    employeeId: new FormControl(this.UserId)


  });
  loggerName: string;
  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
    this.getTaskDetails();
    this.loggerName = userService.Name;
    this.getAllTeamLeaders('TeamLeaders');

  }


  ngOnInit(): void {
  }
  addTaskDetails(params: any) {
    this.api.addTaskDetails(params).subscribe(data => {
      console.log(data, 'data')
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      this.router.navigate(['/main/Employee/employeeDetails'])
    });

  }
  getTaskDetails() {
    if (this.Role == "Admin") {
      this.isOpenTask = true;
      // this.UserId = params;
      console.log(this.UserId, 'user')
      this.api.getAllEmployeeDetails(this.UserId).subscribe(data => {
        this.isTaskDetails = data;
        console.log(data, 'taskDetails')
      });

    } else if (this.Role == "Employee") {
      this.isOpenTask = false;
      this.api.employeeTaskDetail(this.UserId).subscribe(data => {
        this.isTaskDetails = data;
        console.log(data, 'taskDetails')
      });
    }
  }

  getAllTeamLeaders(params: any) {
    this.api.getTeamLeaders(params).subscribe(data => {
      console.log(data, "geeth paithiyam");
    })
  }
  
}
