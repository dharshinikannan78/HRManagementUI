import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  employeeId: any;
  attendanceId: any;
  _role: any;
  _projectId: any
  _user: any;
  _inTime: any
  _name: any;
  _userId: any;
  _employeeTaskId: any;
  _team: any
  _check: any;

  constructor() { }


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

  get EmployeeId(): any {
    return this.employeeId;
  }

  set ProjectId(id: any) {
    localStorage.setItem('ProjectId', id);
    this._projectId = id;
  }
  get ProjectId(): any {
    return this._projectId;
  }

  set EmployeeId(id: any) {
    localStorage.setItem('EmployeeId', id);
    this.employeeId = id;
  }
  get EmployeeTaskId(): any {
    return this._employeeTaskId;
  }

  set EmployeeTaskId(id: any) {
    localStorage.setItem('EmployeeTaskId', id);
    this._employeeTaskId = id;
  }
  get AttendanceId(): any {
    return this.attendanceId;
  }

  set AttendanceId(id: any) {
    localStorage.setItem('AttendanceId', id);
    this.attendanceId = id;
  }

  get InTime(): any {
    return this._inTime;
  }

  set InTime(intime: any) {
    localStorage.setItem('InTime', intime);
    this._inTime = intime;
  }

  get Role(): any {
    return localStorage.getItem('Role');
  }
  set Role(role: any) {
    localStorage.setItem('Role', role);
    this._role = role;
  }
  get Team(): any {
    return localStorage.getItem('Team');
  }
  set Team(team: any) {
    localStorage.setItem('Team', team);
    this._team = team;
  }

  get UserId(): any {
    return this._userId;
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
  setUserId(params: any) {
    this._userId = params;
  }
  getUserId(): any {
    return this._userId;
  }
  getRole(): boolean {
    if (this.Role == 'Admin' || this.Role == 'Manager') return true;
    return false;
  }
  getAdminOnlyRole(): boolean {
    if (this.Role == 'Admin') return true;
    return false;
  }
  getEmpOnlyRole(): boolean {
    if (this.Role == 'Employee') return true;
    return false;
  }
}