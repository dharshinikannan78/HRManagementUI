import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {




  employeeId: any;
  attendanceId:any;
  _role: any;

  //  UserId:any;
   _user:any;

  _name: any;
  _userId: any;

  constructor() { }
//   isValid = () => {
//     const user = localStorage.getItem('userName');
//     if (!user) {
//         return false;
//     }
//     return true;
// }

get User(): string {
    return this._user;
}
set User(user: string) {
    localStorage.setItem('userName', user);
    this._user = user;
}
  isValid = () => {
    const user = localStorage.getItem('userName');
    if (!user) {
        return false;
    }
    return true;
}

// get User(): string {
//     return this._user;
// }
// set User(user: string) {
//     localStorage.setItem('userName', user);
//     this._user = user;
// }

  get EmployeeId(): any {
    return this.employeeId;
  }

  set EmployeeId(id: any) {
    localStorage.setItem('employeeId', id);
    this.employeeId = id;
  }
  get AttendanceId(): any {
    return this.attendanceId;
  }

  set AttendanceId(id: any) {
    localStorage.setItem('AttendanceId', id);
    this.attendanceId = id;
  }

  get Role(): any {
    return localStorage.getItem('Role');
  }
  set Role(role: any) {
    localStorage.setItem('Role', role);
    this._role = role;
  }
  get UserId(): any {
    return localStorage.getItem('UserId');
  }
  set UserId(Id: any) {
    localStorage.setItem('UserId', Id);
    this._userId = Id;
  }
  get Name(): any {
    return localStorage.getItem("Name");
  }
  set Name(name: any) {
    localStorage.setItem('Name', name);
    this._name = name;
  }
  setEmployeeId(params: any) {
    this.employeeId = params;
  }
  getEmployeeId(): any {
    return this.employeeId;
  }
  setAttendanceId(params: any) {
    this.attendanceId = params;
  }
  getAttendanceId(): any {
    return this.attendanceId;
  }

}