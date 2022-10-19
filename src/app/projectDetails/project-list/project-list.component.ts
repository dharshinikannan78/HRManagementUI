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

  isProjectdata: any;
  ProjectDetails: any;
  showModal: boolean = false;
  createdBy = this.userService.Name;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  isEnable: boolean = true;
  roleForRestrict: boolean;

  addProjectDetail: FormGroup = new FormGroup({
    assiginedId: new FormControl(this.EmployeeId),
    projectTitle: new FormControl(''),
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
    createdBy: new FormControl(this.createdBy),
    priority: new FormControl(''),
    totalDays: new FormControl(),
    // startDate: new FormControl(),
    endDate: new FormControl()
  });

  updateProjectForm: FormGroup = new FormGroup({
    projectId: new FormControl(),
    assiginedId: new FormControl(),
    projectName: new FormControl(),
    projectTitle: new FormControl(),
    projectDescription: new FormControl(),
    startDate: new FormControl(),
    projectStatus: new FormControl(),
    endDate: new FormControl(),
    // todayDays: new FormControl(),
    createdBy: new FormControl(),
    priority: new FormControl()
  });

  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getAllProjectDetails();
    this.roleForRestrict = this.userService.getRole()
  }

  addProjectDetails(params: any) {
    this.api.addProjectDetails(params).subscribe((data: any) => {
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }

  getProjectClick(params: any) {
    this.showModal = true;
    this.isProjectdata = params;
    console.log(this.isProjectdata, "project data");
  }

  updateProject(params: any) {
    this.api.updateProject(params).subscribe(data => {
      console.log(data,)
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }

  empIdForRestr: number;
  getAllProjectDetails() {
    if (this.userService.Role != 'Admin' && this.userService.Role != 'Manager') { this.empIdForRestr = this.EmployeeId }
    console.log(this.userService.Role, "role form kanban")
    console.log(this.empIdForRestr, "salman   kanban")
    this.api.getAllProjectDetails(this.empIdForRestr).subscribe(data => {
      console.log(data, "1 of 20");
      this.ProjectDetails = data
    })
  }

  getIdAndRouteToOverview = (Id: any) => this.router.navigate(['projectOverview', Id]);



}
