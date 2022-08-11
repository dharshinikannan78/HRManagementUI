import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

private _emplyId: string = null;
private _role:string=null;
 private _Users: any=null;
  UserId: any;
  constructor() { }

  get EmployeeId(): string {
    return this._emplyId;
  }

  set EmployeeId(id: string) {
    localStorage.setItem('employeeId', id);
    this._emplyId = id;
  }

  get Role(): string {
    return this._role;
}
set Role(role: string) {
    localStorage.setItem('Role', role);
    this._role = role;
}
get Users(): any {
  return this._Users;
}
set Users(user: any) {
  localStorage.setItem('userId', user);
  this._Users = user;
}
setUserId(params: any) {
  this.UserId = params;
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

}
