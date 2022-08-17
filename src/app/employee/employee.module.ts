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
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
