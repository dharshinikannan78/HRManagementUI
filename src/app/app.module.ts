import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { LeaveComponent } from './leave/leave.component';
import { AttendanceComponent } from './attendance/attendance.component';




@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    LoginComponent,
    EmployeeDetailsComponent,
    AddEmployeeDetailsComponent,
    AttachmentComponent,
    LeaveComponent,
    AttendanceComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
