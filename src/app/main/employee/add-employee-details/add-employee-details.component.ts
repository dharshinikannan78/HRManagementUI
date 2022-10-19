import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee-details',
  templateUrl: './add-employee-details.component.html',
  styleUrls: ['./add-employee-details.component.scss']
})


export class AddEmployeeDetailsComponent implements OnInit {

  step: number = 1;
  isenable: boolean = false;
  formData: any;
  fileList: any[] = [];
  loginAcess: string = 'none';
  createLogin: boolean = false;
  createManager: boolean = false;
  resumeFormat: string[] = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/msword'];
  imageFormat: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  attachmentIds: any = [];
  attachmentName: any = [];
  reportingPerson: any;
  userDetails: any = [];
  employeeDetail: any;
  constructor(private router: Router, private api: ApiServiceService) {
    this.formData = new FormData();



    this.employeeDetail = new FormGroup({
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
      userId: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userLogin();
  }

  thisFormValid() {
    if (this.employeeDetail.invalid) {
      return true;
    }
    return false;
  }

  isEmailExist: boolean;
  validateEmail(ev: any) {
    this.api.ValidateEmail(ev.target.value).subscribe((data: string): boolean => {
      if (data.toLowerCase() === 'user found') return this.isEmailExist = true;
      return this.isEmailExist = false;
    });
  }

  uploadcandidateFile = (files: any, type: string) => {
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      console.log(this.formData, "form data")
      if (files[i].size > 10000000) {
        return alert("file size should be less than 10MB");
      }
      if (type == 'resume') {
        if (this.resumeFormat.indexOf(files[i].type) != -1) {
          return this.formData.append("resume", files[i]);
        }
        this.employeeDetail.controls['']
        return alert("Resume File format shoud be .pdf, .doc, .txt");
      }
      if (type == 'image') {
        if (this.imageFormat.indexOf(files[i].type) != -1) {
          return this.formData.append("image", files[i]);
        }
        return alert("Image File format shoud be .png, .jpg, .jpeg, .gif");
      }
      if (type == 'other') return this.formData.append("other", files[i]);
    }
  }

  userLogin() {
    this.api.userlogin().subscribe((data: any) => {
      this.userDetails = data
      console.log(data, "report person ARRAY")
      this.reportingPerson = this.userDetails;
    });
  }

  loginAccess() {
    console.log("hello from salman");
    if (this.loginAcess == "Employee") this.reportingPerson = this.userDetails.employee
    if (this.loginAcess == "TeamLead") this.reportingPerson = this.userDetails.teamLead
    if (this.loginAcess == "Manager") this.reportingPerson = this.userDetails.manager
  }

  submit(employeeDetail: any) {
    console.log(this.loginAcess, "login access")
    if (this.step == 4)
      this.api.uploadFileAttachment(this.formData).subscribe((data: any) => {
        this.attachmentIds.push(data.attachmentId);
        this.attachmentName.push(data.attachmentPath);

        employeeDetail.AttachmentIds = this.attachmentIds.toString();
        console.log(this.createLogin, "login create")
        this.api.addemployeeDetails(this.loginAcess, employeeDetail).subscribe((data: any) => {
          this.step = this.step + 1;
          setTimeout(() => {
            this.step = this.step = 1;
          }, 200);
          console.log(data, 'data')
          console.log(employeeDetail, 'employee');
          this.employeeDetail.reset();
          this.createLogin = false;
          Swal.fire({
            text: 'Added Sucessfully!',
            icon: 'success',
            timer: 1000
          });
        });
      });
  }

  prev() {
    this.step = this.step - 1;
  }

  next() {
    this.step = this.step + 1;
  }

}


