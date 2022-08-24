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
<<<<<<< HEAD
      { path: '', redirectTo: 'leave', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'attendance', pathMatch: 'full' }
=======
      { path: '', redirectTo: 'Employee', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/main/attendance', pathMatch: 'full' },
>>>>>>> geetha
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
