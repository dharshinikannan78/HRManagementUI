import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './service/api-service.service';
import { UserServiceService } from './service/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  UserName: string = localStorage.getItem('userName')

  title = 'hrmanagementapplication';

  
}
