import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetail: FormGroup = new FormGroup({
    employeeId:new FormControl(''),
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


  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient) {
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
}
