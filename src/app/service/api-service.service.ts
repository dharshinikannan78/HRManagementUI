import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {



  URL = 'https://localhost:44394/api/';
  dologin = this.URL + 'Login/Login';
  addUserCredentials = this.URL + 'Login/AddUser';
  allEmployeeDetails = this.URL +'Employee/AllEmployee';
  addemployeeDetail = this.URL +'Employee/AddEmployee';
  updateEmployeeDetail = this.URL +'Employee/Update';
    uploadFile = this.URL + 'FileAttachment/Attachment';
  attachmentFileDetails = 'https://localhost:44394/api/FileAttachment/GetAttachmentDetails?candidateId=';

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
}
