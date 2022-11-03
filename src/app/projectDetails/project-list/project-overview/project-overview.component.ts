import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('closeModal') closeModal: ElementRef
  @ViewChild('AddTeamModal') AddTeamModal: ElementRef
  @ViewChild('UpdatetaskModal') UpdatetaskModal: ElementRef

  constructor(private api: ApiServiceService, private route: ActivatedRoute, private router: Router, private userService: UserServiceService) {

    this.getKanbanDetails();
    // this.getEmployeeIds('');
  }
  public isChecked = false;
  isAssigingTaskTo: any = [];
  EmployeeIds: any = [];
  employeelist: any[];
  EmployeeId: any = localStorage.getItem('EmployeeId');
  EmployeeTaskId: any = localStorage.getItem('EmployeeTaskId');
  ProjectId: any = localStorage.getItem('ProjectId');
  createdBy = this.userService.Name;
  isProjectdata: any;
  employeName: any
  showModal: boolean = false;
  isshowModal: boolean = false;
  isshowModalTask: boolean = false;
  customStyle = {
    objectFit: "cover",
    cursor: "pointer"
  };
  baseUrl: string = this.api.photoUrl;
  particularDetails: any;
  roleForRestrict: boolean;
  ngOnInit(): void {
    this.getEmployeId('');
    this.roleForRestrict = this.userService.getRole()

  }
  taskDetails: any[];
  teamOverflow: boolean = false;
  count: number;
  isTaskData: any;


  addTaskDetail: FormGroup = new FormGroup({
    assigingId: new FormControl(this.EmployeeId),
    employeeId: new FormControl(),
    projectId: new FormControl(),
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

  kanban: any = [];
  projectdetails: any = [];
  taskdetails: any = [];
  listOfMembers: any = [];


  IsArchieved() {
    const data = {
      ...this.projectdetails,
      IsArchived: true
    }
    Swal.fire({
      title: "Are you sure want to Archive ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Move to Archive'
    }).then((result) => {
      this.api.updateProject(data).subscribe(data => {
        Swal.fire({
          text: 'Move to Arichved!!!',
          confirmButtonText: "Ok",
          icon: 'success',
          timer: 1000
        });
        this.router.navigate(['list']);
      });
    })

  }
  empIdForRestr: number;
  getKanbanDetails() {
    let id = this.route.snapshot.paramMap.get('id')
    if (this.userService.Role != 'Admin' && this.userService.Role != 'Manager') { this.empIdForRestr = this.EmployeeId }
    this.api.kanbanTaskDetails(id, this.empIdForRestr).subscribe((data: any) => {
      this.kanban = data;
      this.projectdetails = data.details[0];
      this.taskdetails = data.taskDetails;
    });
    this.addTaskDetail.controls['projectId'].setValue(id);
    this.loadTeamList();
  }

  loadTeamList() {
    let id = this.route.snapshot.paramMap.get('id')
    this.api.getEmployeeListForProjext(id).subscribe((data: any) => {
      this.employeelist = data
      if (this.employeelist.length > 4) {
        this.teamOverflow = true;
        this.count = this.employeelist.length - 4;
      }
    });
  }

  getEmployeeName = (params: number) => this.api.getallEmployeeDetailsWithPhoto(params).subscribe(data => this.employeName = data);


  getEmployeId(paramas: any) {
    this.userService.EmployeeTaskId = paramas;
  }

  addTaskDetails(params: any) {
    this.api.addTaskDetails(params).subscribe((data: any) => {
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      this.closeModal.nativeElement.click();
      this.getKanbanDetails();
    });
  }

  getProjectClick(params: any) {
    this.isProjectdata = params;
    this.showModal = true;
  }

  getTaskClick(params: any) {
    this.isTaskData = params;
  }

  UpdateTaskDetails(params: any) {
    this.api.updateTaskDeatils(params).subscribe(data => {
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      this.UpdatetaskModal.nativeElement.click();
      this.getKanbanDetails();
    });
  }

  IsTaskArchieved() {
    const data = {
      ...this.taskdetails[0][0],
      isTaskArchieved: true
    };
    Swal.fire({
      title: "Are you sure want to Archive ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Move to Archive'
    }).then((result) => {
      this.api.updateTaskDeatils(data).subscribe(data => {

        Swal.fire({
          text: 'Archived Sucessfully!',
          icon: 'success',
          timer: 1000
        });
        this.getKanbanDetails();
      });
    });
  }

  IsSelectEmployee() {
    let ProjId = this.route.snapshot.paramMap.get('id');
    this.api.AddPeopleToProject(Number(ProjId), this.EmployeeIds).subscribe(data => {
      Swal.fire({
        text: 'Update Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      this.AddTeamModal.nativeElement.click();
      this.loadTeamList();
    })
  }

  selectEmployeeIds = (paramas: any) => this.EmployeeIds.push(paramas);

  getEmployeeDetailsForTask(params: any) {
    this.api.getEmployeeListForProjext(params).subscribe(data => {
      this.userService.ProjectId = params;
    });
  }
  getData(data: any) {
    this.isAssigingTaskTo = data
  }
}


