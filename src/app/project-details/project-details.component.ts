import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')
  isTaskData: any;
  isshowModal: boolean = false;

  updateTaskDetails: FormGroup = new FormGroup({
    taskId: new FormControl(),
    employeeId: new FormControl(),
    projectId: new FormControl(),
    taskName: new FormControl(),
    taskDescription: new FormControl(),
    taskStatus: new FormControl(),
    assigingId: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    priority: new FormControl()
  });
  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getTaskDetails();
  }
  getTaskDetails() {
    this.api.employeeTaskDetail(this.EmployeeId).subscribe(data => {
      this.isTaskData = data
      console.log(data, 'geethatask')
    })
  }
  UpdateTaskDetails(params: any) {
    console.log(params, 'Geetha');
    this.api.updateTaskDeatils(params).subscribe(data => {
      console.log(data, 'data');
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }
  getTaskClick(paramas: any) {
    console.log(paramas, 'params')
    this.isTaskData = paramas;
    this.isshowModal = true;
    console.log(this.isTaskData, 'isTaskData')
  }
}
