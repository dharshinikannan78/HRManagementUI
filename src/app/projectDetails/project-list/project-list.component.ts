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
  Team: string = localStorage.getItem('Team')
  EmployeeId: string = localStorage.getItem('EmployeeId')
  isXml:boolean=true;
  isSoftware:boolean=true;
  isEpub:boolean=true;
  isTable:boolean=true;
  constructor(private api: ApiServiceService, private router: Router, private userService: UserServiceService) {
   
   }

  ngOnInit(): void {
    this.getProjectDetails("");
  }

  getProjectDetails(params: any) {

if(this.userService.Role=="Admin"){

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

  else if(this.userService.Role=="TeamLeader")
  {
if(this.userService.Team=="Xml"){
  this.isOpen = true;
  this.isXml=true;
  this.isEpub=false;
  this.isTable=false;
  this.isSoftware=false;
}
if(this.userService.Team=="Software"){
  this.isOpen = true;
  this.isXml=false;
  this.isEpub=false;
  this.isTable=false;
  this.isSoftware=true;
}
if(this.userService.Team=="Table"){
  this.isOpen = true;
  this.isXml=false;
  this.isEpub=false;
  this.isTable=true;
  this.isSoftware=false;
}
if(this.userService.Team=="Epub"){
  this.isOpen = true;
  this.isXml=false;
  this.isEpub=true;
  this.isTable=false;
  this.isSoftware=false;
}

  this.api.getProjectTeamMembers(params).subscribe(data => {
    this.teamMembers = data;
    console.log(data, 'team')
  });
  this.api.getprojectTaskDetails(params).subscribe(data => {
    this.taskDetails = data;
    console.log(data, 'task')
  })

}
else if(this.userService.Role=="TeamMember")
{
if(this.userService.Team=="Xml"){
this.isOpen = true;
this.isXml=true;
this.isEpub=false;
this.isTable=false;
this.isSoftware=false;
}
if(this.userService.Team=="Software"){
this.isOpen = true;
this.isXml=false;
this.isEpub=false;
this.isTable=false;
this.isSoftware=true;
}
if(this.userService.Team=="Table"){
this.isOpen = true;
this.isXml=false;
this.isEpub=false;
this.isTable=true;
this.isSoftware=false;
}
if(this.userService.Team=="Epub"){
this.isOpen = true;
this.isXml=false;
this.isEpub=true;
this.isTable=false;
this.isSoftware=false;
}
this.api.getprojectTaskDetails(params).subscribe(data => {
  this.taskDetails = data;
  console.log(data, 'task')
});
}
}
}
