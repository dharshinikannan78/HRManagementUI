import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  isData: any;

  constructor(
    private router: Router,
    private api: ApiServiceService,
    private userService: UserServiceService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }
  bearerToken: any
  dologin: FormGroup = this.formBuilder.group({
    mailId: ['', Validators.required],
    password: ['', Validators.required]
  });

  addUser: FormGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    reNewPassword: new FormControl('', Validators.required)
  });



  firstUser: boolean = false;
  protected userData: any;
  getCredentails(form: any) {
    this.api.getLogin(form).subscribe((data: any): any => {
      this.userData = data;
      console.log(this.userData, "user data")
      if (data) {
        if (data.isFirstLogin == true) {
          return this.firstUser = true;
        }
        this.userService.EmployeeId = data.employeeId;
        this.userService.Role = data.role;
        this.userService.Name = data.firstName + ' ' + data.lastName;
        this.router.navigate(['main'], { replaceUrl: true });
      }
    }), (error: Response) => {
      if (error.status === 404) {
        Swal.fire({
          text: 'You have enter the Wrong Credentials',
          icon: 'error',
          timer: 1000
        });
      }
    };
  }


  thisFormValid() {
    if (this.dologin.invalid) {
      return true;
    }
    return false;
  }

  onClick() {
    this.router.navigate(['/addUser']);
  }
  get f() { return this.dologin.controls; }


  submitChangedPassword(formData: any) {
    let payload = {
      'OldPassword': formData.oldPassword,
      'NewPassword': formData.newPassword,
      'UserId': this.userData.userId
    }
    console.log(this.userData.userId, "hello this is user id")
    if (formData.newPassword != formData.reNewPassword) {
      return alert("password must be same")
    }
    this.api.editUser(payload).subscribe(data => {
      console.log(data, "data from login edit");
      this.router.navigate(['main'], { replaceUrl: true });
    });
  }

}
