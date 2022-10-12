import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(private api: ApiServiceService, private route: ActivatedRoute, private router: Router, private userService: UserServiceService) {

    this.getKanbanDetails()
  }
  public isChecked = false;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  EmployeeTaskId: any = localStorage.getItem('EmployeeTaskId');
  ProjectId: any = localStorage.getItem('ProjectId');
  createdBy = this.userService.Name;
  isProjectdata: any;
  employeName: any
  showModal: boolean = false;
  isshowModal: boolean = false;
  customStyle = {
    objectFit: "cover",
    cursor: "pointer"
  };
  particularDetails: any;
  ngOnInit(): void {
    this.getEmployeeName();
    this.getEmployeId('');

  }
  taskDetails: any[];
  teamOverflow: boolean = false;
  count: number;
  isTaskData: any;


  addTaskDetail: FormGroup = new FormGroup({
    assigingId: new FormControl(this.EmployeeId),
    employeeId: new FormControl(this.EmployeeTaskId),
    projectId: new FormControl(this.ProjectId),
    taskName: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    Priority: new FormControl(''),
    taskDescription: new FormControl(''),
    createBy: new FormControl(this.createdBy),
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
  });
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
  // getTaskDetails() {
  //   this.api.getprojectTaskDetails('xml').subscribe((data: any[]) => {
  //     this.taskDetails = data;
  //     console.log(data, "jhjhjhjhjh")
  //     if (this.taskDetails.length > 3) {
  //       this.teamOverflow = true;
  //       this.count = this.taskDetails.length - 3;
  //     }
  //   })
  // }
  kanban: any = [];
  projectdetails: any = [];
  taskdetails: any = [];
  listOfMembers: any = [];
  image: any = [];



  IsArchieved() {
    console.log('getha')
    const data = {
      ...this.projectdetails,
      ProjectStatus: "archived", IsArchived: true
    }
    console.log(data, 'helo salman')
    this.api.updateProject(data).subscribe(data => {
      console.log(data,)
      Swal.fire({
        text: 'Move to Arichved!!!',
        confirmButtonText: "Ok",
        icon: 'success',
        timer: 1000
      });
      // this.showModal == false;
      // this.getKanbanDetails()
      this.router.navigate(['list']);
    });
  }

  getKanbanDetails() {
    let id = this.route.snapshot.paramMap.get('id')
    this.api.kanbanTaskDetails(id).subscribe((data: any) => {
      this.kanban = data;
      console.log(data, "task details new")
      this.image = data.image;
      console.log(this.image, 'image')
      this.projectdetails = data.details[0];
      console.log(this.projectdetails, "this.projectdetails")
      this.taskdetails = data.taskDetails;
      console.log(data, "hello from kanban")
    })
  }
  getProjectId(params: any) {
    this.userService.ProjectId = params;
    console.log(params, 'id')
    // this.projectId = params;
    console.log(params, 'id')
  }
  getEmployeeName() {
    this.api.getEmployeeName().subscribe(data => {
      console.log(data, 'nameData')
      this.employeName = data;
      console.log(this.employeName, 'name')
    });
  }

  getEmployeId(paramas: any) {
    console.log(paramas, 'params')
    this.userService.EmployeeTaskId = paramas;
    // this.router.navigate(['taskDetails']);
    console.log(this.userService.EmployeeTaskId, 'this.userService.EmployeeTaskId')
  }
  addTaskDetails(params: any) {
    this.api.addTaskDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      // this.addProjectDetail.reset();
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }
  getProjectClick(params: any) {
    this.isProjectdata = params;
    console.log(this.isProjectdata, 'Geetha');
    this.showModal = true;
    console.log(params, 'Salman');
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
  getTaskClick(params: any) {
    console.log(params, 'params')
    this.isTaskData = params;
    this.isshowModal = true;
    console.log(this.isTaskData, 'isTaskData')
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
  IsTaskArchieved() {
    console.log('getha')
    const data = {
      ...this.taskdetails[0][0],
      taskStatus: "Archived", isTaskArchieved: true
    };
    console.log(data, 'data geetha');
    this.api.updateTaskDeatils(data).subscribe(data => {
      console.log(data, 'data');
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      window.location.reload();
    });
  }
  IsSelectEmployee() {
    const data = {
      ...this.projectdetails,
      EmployeeIds: 'helo',
    };

    this.api.updateProject(data).subscribe(data => {
      console.log(data, 'salman')
    })
  }
  getEmployeeIds(paramas: any) {
    console.log(paramas, 'geetha')
  }
}


