import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  
  employeeId: any;
  _role: any;
   
  constructor() { }

  get EmployeeId(): any {
    return this.employeeId;
  }

  set EmployeeId(id: any) {
    localStorage.setItem('employeeId', id);
    this.employeeId = id;
  }

  get Role(): any {  
    return this._role;
}
set Role(role: any) {
    localStorage.setItem('Role', role);
    this._role = role;
}


//   setEmployeeId(params: any) {
//     this._emplyId = params;
//   }
//   getEmployeeId(): string {
//     return this._emplyId;
// }


  setEmployeeId(params: any) {
    this.employeeId = params;
  }
  getEmployeeId(): any {
    return this.employeeId;
}

}