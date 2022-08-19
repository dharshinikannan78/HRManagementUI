import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  constructor(
    private router: Router,
    private api: ApiServiceService,
    private userService: UserServiceService
  ) {
  }

  ngOnInit(): void {
  }

  dologin: FormGroup = new FormGroup({
    mailId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  // getCredentails(form: any) {
  // // this.submitted = true;
  // this.api.getLogin(form).subscribe(data => {
  //   this.submitted = true;
  //   this.router.navigate(['/addUser']);
  //   console.log(data, 'login')
  // }, (error: Response) => {
  //   if (error.status === 404) {
  //     Swal.fire({
  //       text: 'You have enter the Wrong Credentials',
  //       icon: 'error',
  //       timer: 1000
  //     });
  //   }
  // });
  getCredentails(form: any) {
    this.api.getLogin(this.dologin.value).subscribe((data: any) => {
      if (data) {
        console.log(data, "role")
        this.userService.EmployeeId = data.employeeId;
        this.userService.Role = data.role;
        this.userService.Name = data.firstName + data.lastName;
        if (data.role == "Admin") {
          this.router.navigate(['main'], { replaceUrl: true });
        }
        else {
          this.router.navigate(['main'], { replaceUrl: true });
        }
      }
    }, (error: Response) => {
      if (error.status === 404) {
        Swal.fire({
          text: 'You have enter the Wrong Credentials',
          icon: 'error',
          timer: 1000
        })
      }
    });
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

}
