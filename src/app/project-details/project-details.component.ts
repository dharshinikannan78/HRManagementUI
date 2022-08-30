import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  isOpen: boolean = true;
  createdBy = this.userService.Name;
  EmployeeId: any = localStorage.getItem('EmployeeId');


  addProjectDetail: FormGroup = new FormGroup({
    assiginedId: new FormControl(this.EmployeeId),
    projectTitle: new FormControl(''),
    projectDescription: new FormControl(''),
    createBy: new FormControl(this.createdBy),
  });

  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  open() {
    this.isOpen = !this.isOpen;
  }
  addProjectDetails(params: any) {
    this.api.addProjectDetails(params).subscribe((data: any) => {
      console.log(data, 'projectDetails');
      Swal.fire({
        text: 'Added Sucessfully!',
        icon: 'success',
        timer: 1500
      });
      // this.addProjectDetail.reset();
      this.router.navigate(['/list'])
    });


  }
}
