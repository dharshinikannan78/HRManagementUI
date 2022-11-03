import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../../service/api-service.service';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  @ViewChild('closeUpdateLeaveModal') closeUpdateLeaveModal: ElementRef
  @ViewChild('closeModal') closeModal: ElementRef

  employeeLeaveDetails: any;
  leaveDetails: any;
  isShow: boolean = false;
  duration: string;
  showModal: boolean = false;
  isPopUp: boolean = false;
  isStatus: boolean = true;
  EmployeeId: string = localStorage.getItem('EmployeeId')
  Role: string = localStorage.getItem('Role')
  UserId: string = localStorage.getItem('UserId')
  today: string = moment().format('YYYY-MM-DD');
  isEmployee: boolean = true;
  isTeamLead: boolean = true;
  isManager: boolean = true;
  isAdmin: boolean = true;
  isClick: boolean = false;
  leaveData: any;
  leaveStatusData: any = [];
  step: number;
  isSuperUser: boolean;
  totalLeave: any;
  totalPermission: string;
  currentMonth = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString();
  month = new Date('MMM d, y');

  applyOnLeave: FormGroup = new FormGroup({
    leaveDay: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    leaveType: new FormControl('', Validators.required),
    leaveReason: new FormControl('', Validators.required),
    teamLeadApprovalStatus: new FormControl('', Validators.required),
    managerApprovalStatus: new FormControl('', Validators.required),
    adminApprovalStatus: new FormControl('', Validators.required),
    employeeId: new FormControl(this.EmployeeId)
  });
  updateLeaveForm: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    leaveId: new FormControl(''),
    teamLeadApprovalStatus: new FormControl(''),
    managerApprovalStatus: new FormControl(''),
    adminApprovalStatus: new FormControl(''),
    teamLeadRejectReason: new FormControl(''),
    managerRejectReason: new FormControl(''),
    adminRejectReason: new FormControl(''),
  });

  constructor(private router: Router, private api: ApiServiceService, private userService: UserServiceService) {
    this.getEmployeeLeave();
    this.check();
    this.GetTotalLeave(this.currentMonth);
    this.getLeaveDetails();
  }

  ngOnInit(): void {
   
    this.getRole()
  }

  getRole() {
    let Role = localStorage.getItem('Role')
    if (Role == "Employee") { this.isSuperUser = true; }
    else {
      this.isSuperUser = false;
    }
  }

  getLeaveDetail(data: any) {
    if (this.Role == "Admin" || this.Role == "Manager" || this.Role == "TeamLead") {
      this.employeeLeaveDetails = data;
    }
    else if (this.Role == "Employee") {
    }
  }

  changeDuration(params: any) {
    let elements = document.getElementsByClassName("forSelectMenu");
    if (params.target.value == 'Day' || params.target.value == 'HalfDay') {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'date');
      }
    }
    else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('type', 'datetime-local');
      }
    }
  }

  getLeaveDetails() {
    this.api.getLeaveDetails(this.EmployeeId, this.UserId).subscribe(data => {
      this.leaveDetails = data
    });
  }

  applyLeave(params: any) {
    this.api.applyLeaveOn(params).subscribe((data) => {
      Swal.fire({
        text: 'Leave Applied Sucessfully!',
        icon: 'success',
        timer: 1000
      });
       this.closeModal.nativeElement.click();
      this.showModal = true;
      window.location.reload();
      this.getLeaveDetails();
      
    }, (error: Response) => {
      if (error.status === 400) {
        Swal.fire({
          text: 'Already Applied for leave or Permisson',
          icon: 'error',
          timer: 3000
        });
      }
      if (error.status === 404) {
        Swal.fire({
          text: 'User Already Checkin Today ',
          icon: 'error',
          timer: 3000
        });
      }
      if (error.status === 403) {
        Swal.fire({
          text: 'Select Valid Date ',
          icon: 'error',
          timer: 3000
        });
      }
    });
  }

  approvalStatus(event: any) {
  }

  updateLeaveDetail(response: string) {
    if (response == "Approved") {
      Swal.fire({
        title: "Are you sure want to Approve?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Approve'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.updateLeaveDetails(this.EmployeeId, response, this.updateLeaveForm.value).subscribe((data) => {
            Swal.fire({
              text: 'Approved',
              icon: 'success',
              timer: 1000
            });
            this.closeUpdateLeaveModal.nativeElement.click();
            this.getLeaveDetails();
          }, (error: Response) => {
            if (error.status === 400) {
              Swal.fire({
                text: 'Request Already Approved or Rejected ',
                icon: 'error',
                timer: 1000
              });
            }
          });
        }
      });
    }
    if (response == "Rejected") {
      Swal.fire({
        title: "Are you sure want to Reject?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reject'
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.updateLeaveDetails(this.EmployeeId, response, this.updateLeaveForm.value).subscribe((data) => {
            Swal.fire({
              text: 'Rejected!',
              icon: 'success',
              timer: 1000
            });
            this.closeUpdateLeaveModal.nativeElement.click();
            this.getLeaveDetails();
          }, (error: Response) => {
            if (error.status === 400) {
              Swal.fire({
                text: 'Request Already Approved or Rejected ',
                icon: 'error',
                timer: 1000
              });
            }
          });
        }
      });
    }
  }

  getEmployeeLeave() {
    this.api.GetEmployeeLeave(this.EmployeeId).subscribe(data => {
      this.leaveData = data
    })
  }

  status: string;
  managerReject: boolean = false;
  teamLeadReject: boolean = false;
  adminReject: boolean = false;

  getLeaveStatus(id: number) {
    this.api.getLeaveStatus(id).subscribe(data => {
      this.leaveStatusData = data;
      this.resetVariable();
      if (this.leaveStatusData.teamLeadApprovalStatus == 'Pending') return this.status = 'teamLead';
      if (this.leaveStatusData.teamLeadApprovalStatus == 'Rejected') return this.teamLeadReject = true, this.status = 'teamLead';

      if (this.leaveStatusData.managerApprovalStatus == 'Pending') return this.status = 'Manager';
      if (this.leaveStatusData.managerApprovalStatus == 'Rejected') return this.managerReject = true, this.status = 'Manager';

      if (this.leaveStatusData.adminApprovalStatus == 'Pending') return this.status = 'Admin';
      if (this.leaveStatusData.adminApprovalStatus == 'Rejected') return this.adminReject = true, this.status = 'Admin';

      return 0;
    });
  }

  resetVariable() {
    this.managerReject = false;
    this.adminReject = false;
    this.teamLeadReject = false;
    this.status = '';
  }

  check() {
    if (this.userService.Role == "Employee") {

      this.isEmployee = !this.isEmployee;
    }
    if (this.userService.Role == "TeamLead") {

      this.isTeamLead = !this.isTeamLead;
    }
    if (this.userService.Role == "Manager") {

      this.isManager = !this.isManager;
    }
    if (this.userService.Role == "Admin") {
      this.isAdmin = !this.isAdmin;
    }
  }

  GetTotalLeave(mon: any) {
    this.api.getTotalLeave(this.EmployeeId, mon).subscribe(data => {
      this.totalLeave = data
    });
    this.api.getTotalPermission(this.EmployeeId, mon).subscribe((datas) => {
      this.totalPermission = datas.toString();
    });
  }

}