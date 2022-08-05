import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _emplyId: string = null;

  constructor() { }

  get EmployeeId(): string {
    return this._emplyId;
  }

  set EmployeeId(id: string) {
    localStorage.setItem('customerId', id);
    this._emplyId = id;
  }

}
