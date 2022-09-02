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
  resumeFormat: string[] = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/msword'];
  imageFormat: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  attachmentIds: any = [];
  attachmentName: any = [];




  employeeDetail:any;
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
      // employeeReferenceNo: new FormControl( '',Validators.required ),
      workMode: new FormControl('', Validators.required),
      filesResume: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      joiningDate: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  OnSaveEmployeeDetails(employeeDetail: any) {
    this.api.uploadFileAttachment(this.formData).subscribe((data: any) => {
      console.log(data, 'file 1');
      this.attachmentIds.push(data.attachmentId);
      this.attachmentName.push(data.attachmentPath);
      console.log(this.attachmentIds, 'file 2');
      console.log(this.attachmentName, 'file 3');

      employeeDetail.AttachmentIds = this.attachmentIds.toString();
      console.log(employeeDetail.AttachmentIds, 'data 4')
      console.log(employeeDetail, 'form data 5')

      this.api.addemployeeDetails(employeeDetail).subscribe((data: any) => {
        console.log(data, 'data 6')
        console.log(employeeDetail, 'employee 7');
        this.employeeDetail.reset();
        Swal.fire({
          text: 'Added Sucessfully!',
          icon: 'success',
          timer: 1500
        });
      });
    });
  }

  thisFormValid() {
    if (this.employeeDetail.invalid) {
      return true;
    }
    return false;
  }

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

  submit(employeeDetail: any) {
    if (this.step == 4)
      this.api.uploadFileAttachment(this.formData).subscribe((data: any) => {
        this.attachmentIds.push(data.attachmentId);
        this.attachmentName.push(data.attachmentPath);

        employeeDetail.AttachmentIds = this.attachmentIds.toString();

        this.api.addemployeeDetails(employeeDetail).subscribe((data: any) => {
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
            timer: 1500
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


