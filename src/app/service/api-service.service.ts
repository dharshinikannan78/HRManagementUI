import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  URL = 'https://localhost:44394/api/';
  dologin = this.URL + 'Login/Login';
  addUserCredentials = this.URL + 'Login/AddUser';
  // allEmployeeDetails = this.URL + 'Employee/AllEmployee';
  allEmployeeDetails = this.URL + 'Employee/GetEmployeeDetails';
  addemployeeDetail = this.URL + 'Employee/AddEmployee';
  updateEmployeeDetail = this.URL + 'Employee/Update';
  uploadFile = this.URL + 'FileAttachment/Attachment';
  attachmentFileDetails = this.URL + 'FileAttachment/GetAttachmentDetails?candidateId=';
  applyLeave = this.URL + 'Leave/ApplyLeave';
  getEmployeeDetailById = this.URL + 'Employee/GetEmployeeDetailsById?id='
  
 
  employeeLeaveDetails = this.URL + 'Leave/GetAllLeaveDetails';
  getUser = this.URL + 'Employee/GetUser?data=';
  getLeave = this.URL + 'Leave/GetLeave?data=';
  getAttendance = this.URL + 'Attendance/GetAttendance?data=';
  attendance = this.URL + 'Attendance/AddAttendance';
  updateLeaveDetail = this.URL + 'Leave/UpdateLeaveDetails'
  taskDetails = this.URL + 'TaskDetails/AddTaskDeatils';
  getEmployeeTaskDetails = this.URL + 'TaskDetails/getemployeeId?id=';
  getTeamTaskDetails = this.URL + 'TaskDetails/employeeId?id=';
  // jwtToken = this.URL + "jwt";

  constructor(private http: HttpClient) { }

  logout = () => {
    localStorage.removeItem('employeeId');
    localStorage.removeItem('Role');
   
   
}


  public headers = new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  });
  
  // getToken() {
  //   return this.http.get(this.jwtToken)
  // }


  getLogin(params: any) {
    return this.http.post(this.dologin, params)
  }

  addUser(params: any) {
    return this.http.post(this.addUserCredentials, params)
  }

  addemployeeDetails(params: any) {
    return this.http.post(this.addemployeeDetail, params)
  }
  getallEmployeeDetails() {
    return this.http.get(this.allEmployeeDetails)
  }
  getUserDetails(data: any) {
    return this.http.get(this.getUser + data)
  }
  updateEmployeeDetails(paramas: any) {
    return this.http.put(this.updateEmployeeDetail, paramas)
  }

  uploadFileAttachment(params: any) {
    return this.http.post(this.uploadFile, params)
  }
  getAttachmentDetail(candidateId: any) {
    return this.http.get(this.attachmentFileDetails + candidateId);
  }
  applyLeaveOn(params: any) {
    return this.http.post(this.applyLeave, params)
  }
  updateLeaveDetails(paramas: any) {
    return this.http.put(this.updateLeaveDetail, paramas)
  }
  
  getLeaveDetails(id: any) {
    return this.http.get(this.getLeave + id)
  }
  addAttendance(params: any) {
    return this.http.post(this.attendance, params)
  }
  getAttendanceDetails(id: any) {
    return this.http.get(this.getAttendance + id)
  }
  addTaskDetails(params: any) {
    return this.http.post(this.taskDetails, params)
  }
  employeeTaskDetail(employeeId: any) {
    return this.http.get(this.getEmployeeTaskDetails + employeeId);
  }
  getAllEmployeeDetails(employeeId: any) {
    return this.http.get(this.getTeamTaskDetails + employeeId,  { headers: this.headers });
  }
  getEmployeeDetailsById(params:string) {
    return this.http.get(this.getEmployeeDetailById + params);
  }
}
