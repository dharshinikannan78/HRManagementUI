import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { LeaveComponent } from './leave/leave.component';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LeaveComponent,
    AttendanceComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainRoutingModule,
    EmployeeModule,
  ]
})
export class MainModule { }
