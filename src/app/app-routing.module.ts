import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EmployeeComponent } from './employee/employee.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'attachment', component: AttachmentComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
