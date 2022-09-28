import { Component, OnInit } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { ApiServiceService } from 'src/app/service/api-service.service';


@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  constructor(private api: ApiServiceService) {
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
    this.api.kanbanTaskDetails(53).subscribe((data: any) => {
      this.kanban = data
      this.projectdetails = data.projectDetails[0];
      this.taskdetails = data.taskDetails;
      console.log(data, "hello from kanban")
    })
  }


  // drag and drop

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragStart(event: DragEvent) {

    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {

    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {

    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    console.log("draggable moved", JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {

    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));
  }
  // drag and drop ends

}


