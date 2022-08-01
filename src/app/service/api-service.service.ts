import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'https://localhost:44394/api/Login/Login';
  add = 'https://localhost:44394/api/Login/AddUser';
  emp = 'https://localhost:44394/api/Employee/AllEmployee';
  addemply = 'https://localhost:44394/api/Employee/AddEmployee';
  getbyId = "https://localhost:44394/api/Employee?id=";
  update = 'https://localhost:44394/api/Employee/Update';
  attendance = "https://localhost:44394/api/Attendance/AddAttendance"

  constructor(private http: HttpClient) { }

  getLogin(params: any) {
    return this.http.post(this.url, params)
  }

  addUser(params: any) {
    return this.http.post(this.add, params)
  }

  addemploye(params: any) {
    return this.http.post(this.addemply, params)
  }
  get() {
    return this.http.get(this.emp)
  }

  updateApi(paramas: any) {
    return this.http.put(this.update, paramas)
  }

  getDetailsById(id: any) {
    return this.http.get(this.getbyId + id)
  }

  attendanceonEmploy(params: any) {
    return this.http.post(this.attendance, params)
  }

}
