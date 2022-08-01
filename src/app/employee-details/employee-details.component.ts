import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetail: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    designation: new FormControl(''),
    address: new FormControl(''),
    number: new FormControl(''),
    emailId: new FormControl(''),
    // dob: new FormControl(''),
    // joiningDate:  new FormControl(''),
  });

  isData: any;
  employee: any
  isEditTable: boolean = false;
  firstName: any;
  lastName: any;
  showModal: boolean = false;
  employeeDetails: any;


  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
    this.getAllDetails();
  }

  getAllDetails() {
    this.api.get().subscribe(data => {
      this.isData = data
      console.log(data, 'geetha')
    });
  }

  onFirstSave(event: any) {
    console.log(event, 'event')
    this.firstName = event.target.value;
    this.employee = {
      ...this.employee,
      firstName: this.firstName,
    }
  }
  onlastSave(event: any) {
    console.log(event, 'event')
    this.lastName = event.target.value;
    this.employee = {
      ...this.employee,
      lastName: this.lastName,
    }
  }
  update() {
    this.api.updateApi(this.employee).subscribe(data => {
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
    this.employee = data
  }
  OnSaveEmployeeDetails(params: any) {
    this.api.addemploye(params).subscribe(data => {
      console.log(data, 'employee');
      this.employeeDetail.reset();
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });

    });
  }



}
