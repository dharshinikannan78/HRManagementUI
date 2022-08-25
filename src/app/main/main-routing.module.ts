import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveComponent } from './leave/leave.component';
import { MainComponent } from './main.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'leave', component: LeaveComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'taskDetails', component: TaskDetailsComponent },
      { path: 'Employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      { path: '', redirectTo: 'Employee', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/main/attendance', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
