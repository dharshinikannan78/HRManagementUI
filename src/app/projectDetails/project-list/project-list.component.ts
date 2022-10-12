import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tr } from 'date-fns/locale';
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
  isProjectdata: any;
  isTaskData: any;
  ProjectDetails: any;
  details: any;
  teamMembers: any;
  taskDetails: any;
  employeName: any;
  showModal: boolean = false;
  isshowModal: boolean = false;
  createdBy = this.userService.Name;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  EmployeeTaskId: any = localStorage.getItem('EmployeeTaskId');
  ProjectId: any = localStorage.getItem('ProjectId');
  Team: string = localStorage.getItem('Team');
  isXml: boolean = true;
  isSoftware: boolean = true;
  isEpub: boolean = true;
  isTable: boolean = true;
  isEnable: boolean = true;

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
    createdBy: new FormControl(this.createdBy),
    priority: new FormControl(''),
    totalDays: new FormControl(),
    // startDate: new FormControl(),
    endDate: new FormControl()

  });
  updateForm: FormGroup = new FormGroup({
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

  updateTaskDetails: FormGroup = new FormGroup({
    taskId: new FormControl(),
    employeeId: new FormControl(),
    projectId: new FormControl(),
    taskName: new FormControl(),
    taskDescription: new FormControl(),
    taskStatus: new FormControl(),
    assigingId: new FormControl(),
  });

  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getEmployeeName();
    this.getEmployeId('');
    // this.getProjectDetails('xml');
    this.getAllProjectDetails();
  }
  addProjectDetails(params: any) {
    this.api.addProjectDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      // this.router.navigate(['taskDetails'])
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
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

  getProjectClick(params: any) {
    this.showModal = true;
    this.isProjectdata = params;
    console.log(this.isProjectdata, 'Geetha');
    console.log(params, 'Salman');
  }

  getTaskClick(params: any) {
    console.log(params, 'params')
    this.isTaskData = params;
    this.isshowModal = true;
    console.log(this.isTaskData, 'isTaskData')
  }

  // getProjectDetails(params: any) {
  //   this.isOpen = true;
  //   console.log(params, 'xml')
  //   this.api.projectDetails(params).subscribe(data => {
  //     this.ProjectDetails = data;
  //     console.log(data, 'project')
  //   });
  //   this.api.getProjectTeamMembers(params).subscribe(data => {
  //     this.teamMembers = data;
  //     console.log(data, 'team')
  //   });
  //   this.api.getprojectTaskDetails(params).subscribe(data => {
  //     this.taskDetails = data;
  //     console.log(data, 'task')
  //   });
  // }
  getProjectDetails(params: any) {

    if (this.userService.Role == "Admin") {

      this.isOpen = true;
      console.log(params, 'XML')
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
    else if (this.userService.Role == "TeamLeader" || this.userService.Role == "TeamMember")
      this.isEnable = false;
    if (this.userService.Team == "XML") {
      this.isOpen = true;
      this.isXml = true;
      this.isEpub = false;
      this.isTable = false;
      this.isSoftware = false;
    }
    if (this.userService.Team == "Software") {
      this.isOpen = true;
      this.isXml = false;
      this.isEpub = false;
      this.isTable = false;
      this.isSoftware = true;
    }
    if (this.userService.Team == "Table") {
      this.isOpen = true;
      this.isXml = false;
      this.isEpub = false;
      this.isTable = true;
      this.isSoftware = false;
    }
    if (this.userService.Team == "Epub") {
      this.isOpen = true;
      this.isXml = false;
      this.isEpub = true;
      this.isTable = false;
      this.isSoftware = false;
    }
    this.api.getprojectTaskDetails(params).subscribe(data => {
      this.taskDetails = data;
      console.log(data, 'task')
    });

  }

  addTaskDetails(params: any) {
    this.api.addTaskDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      this.addProjectDetail.reset();
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }
  getEmployeeName() {
    this.api.getEmployeeName().subscribe(data => {
      console.log(data, 'nameData')
      this.employeName = data;
      console.log(this.employeName, 'name')
    });
  }
  updateProject(params: any) {
    this.api.updateProject(params).subscribe(data => {
      console.log(data,)
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      // this.getProjectDetails('');
      window.location.reload();
    });
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

  getAllProjectDetails() {
    this.api.getAllProjectDetails().subscribe(data => {
      console.log(data, "1 of 20");
      this.ProjectDetails = data

    })
  }
  getProjectDetailsId(Id: any) {
    console.log(Id, 'geetha');
    this.router.navigate(['projectOverview', Id])
  }
}
