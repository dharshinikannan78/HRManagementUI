import { Component, OnInit } from '@angular/core';
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

  step:number=1;
  isenable:boolean=false;
  employeeDetail = new FormGroup({

  
      firstName: new FormControl(  '',Validators.required),
      lastName: new FormControl(  '',Validators.required),
      dob: new FormControl( '',Validators.required ),
   
  
    gender: new FormControl( '',Validators.required ),
    address: new FormControl( '',Validators.required ),
    number: new FormControl( '',Validators.required ),
    emailId: new FormControl( '',Validators.required ),
   
  
   
    qualification: new FormControl( '',Validators.required ),
    college: new FormControl( '',Validators.required ),
    passedOut: new FormControl( '',Validators.required ),
    skills: new FormControl( '',Validators.required ),
  
    // employeeReferenceNo: new FormControl( '',Validators.required ),
    workMode: new FormControl( '',Validators.required ),
   filesResume: new FormControl( '',Validators.required ),
    designation: new FormControl( '',Validators.required ),
    joiningDate: new FormControl( '',Validators.required)
  });
   
  

  attachmentIds: any = [];
  attachmentName: any = [];

  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
  }

  // OnSaveEmployeeDetails(employeeDetail: any) {
  //   employeeDetail.AttachmentIds = this.attachmentIds.toString();
  //   console.log(employeeDetail.AttachmentIds, 'data')
  //   this.api.addemployeeDetails(employeeDetail).subscribe((data: any) => {
  //     console.log(data, 'data')
  //     console.log(employeeDetail, 'employee');
  //     this.employeeDetail.reset();
  //     Swal.fire({
  //       text: 'Added Sucessfully!',
  //       icon: 'success',
  //       timer: 1500
  //     });
  //   });
  //   this.api.uploadFileAttachment(this.formData).subscribe((data: any) => {
  //     console.log(data, 'file');
  //     this.attachmentIds.push(data.attachmentId);
  //     this.attachmentName.push(data.attachmentPath);
  //     console.log(this.attachmentIds, 'file');
  //     console.log(this.attachmentName, 'file');
  //   });
  // }

  thisFormValid() {
    if (this.employeeDetail.invalid) {
      return true;
    }
    return false;
  }
formData:any;
  uploadcandidateFile = (files: any, fileType: string) => {
    let filetoUpoload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', filetoUpoload, filetoUpoload.name);
    this.formData.append('fileType', fileType);
    this.api.uploadFileAttachment(this.formData).subscribe((data: any) => {
      console.log(data, 'file');
      this.attachmentIds.push(data.attachmentId);
      this.attachmentName.push(data.attachmentPath);
      console.log(this.attachmentIds, 'file');
      console.log(this.attachmentName, 'file');
    });
  }
  submit(employeeDetail: any)
  { 
   if(this.step==4)
    employeeDetail.AttachmentIds = this.attachmentIds.toString();
    console.log(employeeDetail.AttachmentIds, 'data')
    this.api.addemployeeDetails(employeeDetail).subscribe((data: any) => {
      this.step=this.step+1;
      setTimeout(() => {
        this.step=this.step=1;
      
      },200);
     
      
      console.log(data, 'data')
      console.log(employeeDetail, 'employee');
      this.employeeDetail.reset();
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
  });
    
  }
  prev()
  {
    this.step=this.step-1;
  }
  next()
  {
      this.step=this.step+1;
     
  }
}


