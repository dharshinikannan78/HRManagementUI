import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AttachmentComponent } from '../attachment/attachment.component';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AvatarModule } from 'ngx-avatar';


const avatarColors = ["#FFB6C1", "#2c3e50", "#95a5a6", "#f39c12", "#1abc9c"];

@NgModule({
  declarations: [
    AddEmployeeDetailsComponent,
    EmployeeDetailsComponent,
    AttachmentComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    EmployeeRoutingModule,
    AvatarModule.forRoot({
      colors: avatarColors
    })
  ]
})
export class EmployeeModule { }
