import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { UserServiceService } from '../../service/user-service.service';



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetail: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    designation: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    emailId: new FormControl(''),
    dob: new FormControl(''),
    joiningDate: new FormControl(''),
  });

  isData: any;
  employee: any
  isEditTable: boolean = false;
  firstName: any;
  lastName: any;
  showModal: boolean = false;
  employeeDetails: any;
  attachment: any
  isNavOpen: boolean = true;


  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userDervice: UserServiceService) {
  }

  ngOnInit(): void {
    this.getAllDetails();
  }

  getAllDetails() {
    this.api.getallEmployeeDetails().subscribe(data => {
      this.isData = data
      console.log(data, 'geetha')
    });
  }

  updateEmployee(employeeDetail: any) {
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

  getEmployeeDetails(data: any) {
    console.log(data, 'geetha')
    this.showModal = true;
    this.employee = data;
    this.attachment = [];
    this.api.getAttachmentDetail(data.employeeId).subscribe(data => {
      console.log(data, 'data')
      this.attachment = data;
      console.log(this.attachment, 'data')
    });
  }

  onClick() {
    this.router.navigate(['/addemployee'])
  }
  showNavContent: boolean;
  openNav() {
    let sidenav = document.getElementById("sideNav");
    let main = document.getElementById("main");
    if (window.innerWidth < 500) {
      if (this.showNavContent == false) {
        sidenav.style.width = "0px";
        main.style.marginLeft = "0px";
        this.showNavContent = true;
      }
      else {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.showNavContent = false;
      }
    }
    else {

      if (this.isNavOpen == false) {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.isNavOpen = true;
      }
      else {
        sidenav.style.width = "200px";
        main.style.marginLeft = "200px";
        this.isNavOpen = false;
      }
    }
  }
  leaveApplyOn(id: any) {
    console.log(id, 'helo')
    this.userDervice.EmployeeId = id
    console.log(this.userDervice.EmployeeId, 'pid')
    this.router.navigate(['/leave']);
  }
}
