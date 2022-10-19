import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

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
  employee: any
  attd: any;
  isEditTable: boolean = false;
  firstName: any;
  lastName: any;
  showModal: boolean = false;
  employeeDetails: any;
  attachment: any
  isNavOpen: boolean = true;
  taskDetails: any;
  UserId: string = localStorage.getItem('userId');
  isShown: boolean = true;
  EmployeeId: any = localStorage.getItem("EmployeeId");
  AttendanceId: any = localStorage.getItem("AttendanceId");
  attDetails: any;
  hour: any;
  minute: string;
  second: string;
  AMPM: any;
  check: boolean = true;
  AttendanceIds: any = [];
  InTime: any = [];

  addAttendance: FormGroup = new FormGroup({
    date: new FormControl(moment().format()),
    inTime: new FormControl(moment().format()),
    employeeId: new FormControl(this.EmployeeId)
  });



  getAdminOnlyRole: boolean;
  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userService: UserServiceService,
  ) {
    this.getAllDetails('');
    console.log("came");
    this.getAdminOnlyRole = userService.getAdminOnlyRole();
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    if (localStorage.getItem('checkIn' + this.EmployeeId)) {
      console.log(this.EmployeeId, 'first')
      let test = localStorage.getItem('checkIn' + this.EmployeeId);
      console.log(test, 'second')
      this.check = JSON.parse(test);
    }

    this.getEmployeeDetailById();
    this.getAttendanceById();
    this.getemployeeTaskDetail();
  }

  getEmployeeDetailById() {
    this.api.getEmployeeDetailsById(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee" || this.userService.Role == "Manager" || this.userService.Role == "TeamLead") {
        this.oneEmployee = true;
        this.employeeData = data
      }
    });
  }

  getAttendanceById() {
    this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee" || this.userService.Role == "Manager" || this.userService.Role == "TeamLead") {
        this.oneEmployee = true;
        this.employeeAttendance = data
        console.log(data, 'attd data')
        this.getEmployeeDetailById();
      }
    });
  }
  getemployeeTaskDetail() {
    this.api.employeeTaskDetail(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee" || this.userService.Role == "Manager" || this.userService.Role == "TeamLead") {
        this.oneEmployee = true;
        this.employeeTaskDetail = data
      }
    });
  }

  getAllDetails(params: any) {
    this.api.getUserDetails(this.EmployeeId, params).subscribe((data: any) => {
      console.log(data, "data for accordion")
      if (this.userService.Role == "Admin") {
        this.isData = data;
      }
      if (this.userService.Role == "Employee") {
        this.oneEmployee = false;
        console.log(this.oneEmployee, "wonenknkn")
        this.isData = Array.of(this.isData);
        console.log(this.isData, "while one emp");
      }
      // this.api.getTaskDetailById(this.EmployeeId).subscribe(data => {
      //   this.taskDetails = data;
      // })
    });
  }
  formData: any;
  resumeFormat: any = [];
  imageFormat: any = [];
  uploadcandidateFile = (files: any, type: string) => {
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      console.log(this.formData, "form data")
      if (files[i].size > 1000000) {
        alert("file size should be less than 10MB");
      }
      else {
        if (type == 'resume' && this.resumeFormat.indexOf(files[i].type) != -1) {
          this.formData.append("resume", files[i]);
        }
        if (type == 'image' && this.imageFormat.indexOf(files[i].type) != -1) {
          this.formData.append("image", files[i]);
        }
        else {
          this.formData.append("other", files[i]);
        }
      }
    }
  }

  updateEmployee(employeeDetail: any) {
    if (this.step == 4)
      this.api.updateEmployeeDetails(employeeDetail).subscribe(data => {
        console.log(data, 'update')
        Swal.fire({
          text: 'Updated Sucessfully!',
          icon: 'success',
          timer: 1000
        });
        this.showModal = false;
        location.reload();
      });
  }

  thisFormValid() {
    if (this.employeeDetail.invalid) {
      return true;
    }
    return false;
  }


  onClick() {
    this.router.navigate(['/addemployee'])
  }
  showNavContent: boolean;

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

  // attendanceDetails(params: any) {
  //   Swal.fire({
  //     title: "Are you sure want to CheckIn ?",
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'CheckIn'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.api.addAttendance(params).subscribe((data: any) => {
  //         this.AttendanceIds.push(data.attendanceId);
  //         localStorage.setItem("AttendanceId", data.attendanceId);
  //         this.InTime.push(data.inTime);
  //         this.check = !this.check
  //         localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));
  //         Swal.fire({
  //           text: 'CheckIn Sucessfully!',
  //           icon: 'success',
  //           timer: 1000
  //         });

  //       }, (error: Response) => {
  //         if (error.status === 400) {
  //           Swal.fire({
  //             text: 'User Already Checkin Today',
  //             icon: 'error',
  //             timer: 1000
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  attendanceDetails(params: any) {
    Swal.fire({
      title: "Are you sure want to CheckIn ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckIn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addAttendance(params).subscribe((data: any) => {
          this.AttendanceIds.push(data.attendanceId);
          localStorage.setItem("AttendanceId", data.attendanceId);
          this.InTime.push(data.inTime);
          this.check = !this.check
          localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));
          Swal.fire({
            text: 'CheckIn Sucessfully!',
            icon: 'success',
            timer: 1500
          });
          this.getAttendanceById();
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
    let payload = {
      attendanceId: localStorage.getItem("AttendanceId"),
      employeeId: this.EmployeeId,
      outTime: moment().format()
    }
    Swal.fire({
      title: "Are you sure want to CheckOut ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckOut'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateAttendance(payload).subscribe(data => {
          this.check = !this.check
          localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));
          Swal.fire({
            text: 'CheckOut Sucessfully!',
            icon: 'success',
            timer: 1000
          });
          this.getAttendanceById();
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
          this.getAllDetails('');
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



  getEmployeeDetails(data: any) {
    console.log(data, 'employee id for edit');
    this.api.getEmpDetailsForEdit(data).subscribe(data => {
      console.log(data, 'data')
      this.attachment = data;
      this.employeeDetail.patchValue(data);
    });
  }
  employeeDetail = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    passedOut: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    employeeReferenceNo: new FormControl('', Validators.required),
    workMode: new FormControl('', Validators.required),
    filesResume: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    teamName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    employeeId: new FormControl(),
    userId: new FormControl('')
  });

  submit(employeeDetail: any) {
    console.log(employeeDetail, "update emp details")
    employeeDetail.controls['employeeId'] = this.attachment.employeeId
    if (this.step == 4) {
      this.api.updateEmployeeDetails(employeeDetail.value).subscribe((data: any) => {
        this.step = this.step + 1;
        setTimeout(() => {
          this.step = this.step = 1;
        }, 200);
        console.log(data, 'data')
        console.log(employeeDetail, 'employee');
        this.employeeDetail.reset();
        Swal.fire({
          text: 'Added Sucessfully!',
          icon: 'success',
          timer: 1000
        });
      });
    }
  }

}