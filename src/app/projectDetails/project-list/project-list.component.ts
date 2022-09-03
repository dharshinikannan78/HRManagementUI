import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  isOpen: boolean = false;
  ProjectDetails: any;
  teamMembers: any;
  taskDetails: any;
  employeName: any;
  // projectId = '';
  createdBy = this.userService.Name;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  EmployeeTaskId: any = localStorage.getItem('EmployeeTaskId')
  ProjectId: any = localStorage.getItem('ProjectId')

  addTaskDetail: FormGroup = new FormGroup({
    assigingId: new FormControl(this.EmployeeId),
    employeeId: new FormControl(this.EmployeeTaskId),
    projectId: new FormControl(this.ProjectId),
    // projectTitle: new FormControl(''),
    taskName: new FormControl(''),
    taskDescription: new FormControl(''),
    createBy: new FormControl(this.createdBy),
  });
  addProjectDetail: FormGroup = new FormGroup({
    assiginedId: new FormControl(this.EmployeeId),
    projectTitle: new FormControl(''),
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
    createBy: new FormControl(this.createdBy),
  });
  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getEmployeeName();
    this.getEmployeId('');
    this.getProjectDetails('xml');
  }
  addProjectDetails(params: any) {
    this.api.addProjectDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      // this.addProjectDetail.reset();
      this.router.navigate(['taskDetails'])
    });
  }
  getProjectId(params: any) {
    this.userService.ProjectId = params;
    // this.projectId = params;
    console.log(params, 'id')
  }
  getEmployeId(paramas: any) {
    console.log(paramas, 'params')
    this.userService.EmployeeTaskId = paramas;
    // this.router.navigate(['taskDetails'])
    console.log(this.userService.EmployeeTaskId, 'this.userService.EmployeeTaskId')
  }
  getProjectDetails(params: any) {
    this.isOpen = true;
    console.log(params, 'xml')
    this.api.projectDetails(params).subscribe(data => {
      this.ProjectDetails = data;
      console.log(data, 'project')
    });
    this.api.getProjectTeamMembers(params).subscribe(data => {
      this.teamMembers = data;
      console.log(data, 'team')
    });
    this.api.getprojectTaskDetails(params).subscribe(data => {
      this.taskDetails = data;
      console.log(data, 'task')
    })
  }
  addTaskDetails(params: any) {
    this.api.addTaskDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      // this.addProjectDetail.reset();
      this.router.navigate(['taskDetails'])
    });
  }
  getEmployeeName() {
    this.api.getEmployeeName().subscribe(data => {
      console.log(data, 'nameData')
      this.employeName = data;
      console.log(this.employeName, 'name')
    })
  }
}
