import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  @ViewChild('updateEmployeeModal') updateEmployeeModal: ElementRef

  customStyle = {
    objectFit: "cover",
    cursor: "pointer",
    fontWeight: '700'
  };

  employeeData: any = [];
  employeeAttendance: any;
  employeeTaskDetail: any;
  step: number = 1;
  isData: any = [];
  oneEmployee: boolean;
  attachment: any
  UserId: string = localStorage.getItem('userId');
  EmployeeId: any = localStorage.getItem("EmployeeId");
  AttendanceId: any = localStorage.getItem("AttendanceId");
  hour: any;
  minute: string;
  second: string;
  AMPM: any;
  check: boolean = true;
  getAdminOnlyRole: boolean;
  baseUrl: string = this.api.photoUrl;
  lat: number;
  lng: number;


  constructor(
    private api: ApiServiceService,
    private userService: UserServiceService
  ) {
    this.loadEmployeeDetails();
    this.getAdminOnlyRole = userService.getAdminOnlyRole();

  }

  ngOnInit(): void {

    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    this.attdstatus();
  }

  loadEmployeeDetails = () => {
    if (this.userService.Role != "Admin") {
      this.oneEmployee = true;
      this.api.getEmployeeDetailsById(this.EmployeeId).subscribe((data: any) => {
        this.employeeData = data[0];
      });
      this.api.employeeTaskDetail(this.EmployeeId).subscribe(data => this.employeeTaskDetail = data);
      return this.getAttendanceDetails();
    }
    this.api.getUserDetails(this.EmployeeId).subscribe(data => this.isData = data);
  }

  attdstatus = () => {
    this.api.CheckAttdStatus(this.EmployeeId).subscribe((data: any) => this.check = data);
  }

  getAttendanceDetails() {
    this.api.getUserAttendance(this.EmployeeId).subscribe(data => {
      this.employeeAttendance = data;
      console.log(data, "hello from morning")
    });
  }
  thisFormValid(): boolean {
    if (this.updateEmployeeDetailForm.invalid) return true;
    return false;
  }

  updateDate(date: Date) {
    const hours = date.getHours();
    this.AMPM = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  attendanceDetails() {
    Swal.fire({
      title: "Are you sure want to CheckIn ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckIn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addAttendance(this.EmployeeId).subscribe((data: any) => {
          Swal.fire({
            text: 'CheckIn Sucessfully!',
            icon: 'success',
            timer: 1500
          });

          this.getAttendanceDetails();
          this.attdstatus();
        }, (error: Response) => {
          if (error.status === 400) {
            Swal.fire({
              text: ' Applied for leave..Please Try Again',
              icon: 'error',
              timer: 3000
            });
          }

          if (error.status === 404) {
            Swal.fire({
              text: 'User Already Checkin Today ...Please Try Again',
              icon: 'error',
              timer: 3000
            });
          }
        });
      }
    });

  }

  updateattendanceDetails() {
    Swal.fire({
      title: "Are you sure want to CheckOut ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckOut'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateAttendance(this.EmployeeId).subscribe(data => {
          Swal.fire({
            text: 'CheckOut Sucessfully!',
            icon: 'success',
            timer: 1000
          });
          this.getAttendanceDetails();
          this.attdstatus();
        });
      }
    });
  }

  deleteEmployeedetails(id: any, uname: any) {
    Swal.fire({
      title: "Are you sure want to delete " + uname + " ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe(() => {
          Swal.fire({
            text: 'Deleted Sucessfully!',
            icon: 'success',
            timer: 1000
          });
          this.loadEmployeeDetails();
        });
      }
    });
  }

  prev() {
    this.step = this.step - 1;
  }

  next() {
    this.step = this.step + 1;
  }

  updateEmployeeDetailForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    dateOfModified: new FormControl(new Date()),
    number: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    passedOut: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    employeeReferenceNo: new FormControl('', Validators.required),
    workMode: new FormControl('', Validators.required),
    modifiedBy: new FormControl(this.EmployeeId),
    filesResume: new FormControl(''),
    designation: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    teamName: new FormControl('', Validators.required),
    employeeId: new FormControl(),
    userId: new FormControl('')
  });

  getEmployeeDetails(data: any) {
    this.api.getEmpDetailsForEdit(data).subscribe(data => {
      this.attachment = data;
      this.attachment.dob = moment(this.attachment.dob).format("YYYY-MM-DD");
      this.attachment.joiningDate = moment(this.attachment.joiningDate).format("YYYY-MM-DD");
      this.updateEmployeeDetailForm.patchValue(data);
    });
  }

  submit(employeeDetail: any) {
    this.updateEmployeeDetailForm.controls.employeeId.patchValue(this.attachment.employeeId);
    if (this.step == 4) {
      this.api.updateEmployeeDetails(employeeDetail.value).subscribe((data: any) => {
        this.step = this.step + 1;
        setTimeout(() => {
          this.step = this.step = 1;
        }, 200);
        this.updateEmployeeModal.nativeElement.click();
        this.updateEmployeeDetailForm.reset();
        Swal.fire({
          text: 'Added Sucessfully!',
          icon: 'success',
          timer: 1000
        });
        this.loadEmployeeDetails()
      });
    }
  }

}