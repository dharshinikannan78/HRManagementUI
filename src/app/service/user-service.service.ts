import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {



  employeeId: any;
  _role: any;
  _name: any;
  _userId: any;
  constructor() { }

  get EmployeeId(): any {
    return this.employeeId;
  }

  set EmployeeId(id: any) {
    localStorage.setItem('employeeId', id);
    this.employeeId = id;
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

}