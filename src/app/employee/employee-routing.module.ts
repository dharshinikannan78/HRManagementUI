import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
  
  {
    path: 'Employee', component: EmployeeComponent,
    children: [
      { path: 'employeeDetails', component: EmployeeDetailsComponent },
      { path: 'addEmployee', component: AddEmployeeDetailsComponent },
      { path: '', redirectTo: '/Employee/employeeDetails', pathMatch: 'full' }
    ]
  },
  {path: '', redirectTo: '/Employee/employeeDetails', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
