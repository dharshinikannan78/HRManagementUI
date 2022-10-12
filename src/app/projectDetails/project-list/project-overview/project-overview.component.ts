import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(private api: ApiServiceService, private route: ActivatedRoute) {
    this.getTaskDetails();
    this.getKanbanDetails()
  }

  ngOnInit(): void { }
  taskDetails: any[];
  teamOverflow: boolean = false;
  count: number;
  getTaskDetails() {
    this.api.getprojectTaskDetails('xml').subscribe((data: any[]) => {
      this.taskDetails = data;
      console.log(data, "jhjhjhjhjh")
      if (this.taskDetails.length > 3) {
        this.teamOverflow = true;
        this.count = this.taskDetails.length - 3;
      }
    })
  }
  kanban: any = [];
  projectdetails: any = [];
  taskdetails: any = [];

  getKanbanDetails() {
    let test = this.route.snapshot.paramMap.get('id');
    console.log(test, "id from route")
    this.api.kanbanTaskDetails(test).subscribe((data: any) => {
      this.kanban = data
      this.projectdetails = data.projectDetails[0];
      this.taskdetails = data.taskDetails;
      console.log(data, "hello from kanban")
    })
  }

}