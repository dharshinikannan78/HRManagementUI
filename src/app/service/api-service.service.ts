import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'https://localhost:44394/api/Login/Login';
  add = 'https://localhost:44394/api/Login/AddUser';

  constructor(private http: HttpClient) { }


  getLogin(params: any) {
    return this.http.post(this.url, params)
  }
  addUser(params: any) {
    return this.http.post(this.add, params)
  }
}
