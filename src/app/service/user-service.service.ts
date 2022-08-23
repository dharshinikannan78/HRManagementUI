import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  [x: string]: any;

  
  
  employeeId: any;
  _role: any;
   UserId:any;
   _user:any;
  constructor() { }
  isValid = () => {
    const user = localStorage.getItem('userName');
    if (!user) {
        return false;
    }
    return true;
}

get User(): string {
    return this._user;
}
set User(user: string) {
    localStorage.setItem('userName', user);
    this._user = user;
}

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
getUserId(): string {
  return this.UserId;
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