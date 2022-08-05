import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  isCreate = false;

  attachmentDetails: any;

  @Input() set attachmentId(value: any) {
    if (value) {
      console.log('CandidateId', this.attachmentId);
      this.attachmentDetails = value;
      this.isCreate = true;
    }
  }
  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  downloadAttachment(id: any) {
    return this.http.get('https://localhost:44394/api/FileAttachment/Download?id=' + id, { responseType: 'blob' }).subscribe((event) => {
      FileSaver.saveAs(event);
    });
  }
}
