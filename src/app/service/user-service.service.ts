import { ComponentFactoryResolver, Injectable } from '@angular/core';

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
    return localStorage.getItem('Role');
  }
  set Role(role: any) {
    localStorage.setItem('Role', role);
    this._role = role;
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