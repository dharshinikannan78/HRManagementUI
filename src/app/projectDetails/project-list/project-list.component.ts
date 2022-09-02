import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  isOpen: boolean = false;
  ProjectDetails: any;
  teamMembers: any;
  taskDetails: any;
  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getProjectDetails('xml');
  }

  getProjectDetails(params: any) {
    this.isOpen = true;
    console.log(params, 'xml')
    this.api.projectDetails(params).subscribe(data => {
      this.ProjectDetails = data;
      console.log(data, 'project')
    });
    this.api.getProjectTeamMembers(params).subscribe(data => {
      this.teamMembers = data;
      console.log(data, 'team')
    });
    this.api.getprojectTaskDetails(params).subscribe(data => {
      this.taskDetails = data;
      console.log(data, 'task')
    })
  }

}
