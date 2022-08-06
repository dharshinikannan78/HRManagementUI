import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  URL = 'https://localhost:5001/api/';
  dologin = this.URL + 'Login/Login';
  addUserCredentials = this.URL + 'Login/AddUser';
  allEmployeeDetails = this.URL + 'Employee/AllEmployee';
  addemployeeDetail = this.URL + 'Employee/AddEmployee';
  updateEmployeeDetail = this.URL + 'Employee/Update';
  uploadFile = this.URL + 'FileAttachment/Attachment';
  attachmentFileDetails = this.URL + 'FileAttachment/GetAttachmentDetails?candidateId=';
  applyLeave = this.URL + 'Leave/ApplyLeave';
  attendance = "https://localhost:5001/api/Attendance/AddAttendance";
  getAttendance="https://localhost:5001/api/Attendance/AllAttendance";


  constructor(private http: HttpClient) { }

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
  addAttendance(params: any) {
    return this.http.post(this.attendance, params)
  }
  getAttendanceDetails(){
    return this.http.get(this.getAttendance)
  }
}
