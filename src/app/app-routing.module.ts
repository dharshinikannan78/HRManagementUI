import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AppComponent } from './app.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'employeeDetails', component: EmployeeDetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
