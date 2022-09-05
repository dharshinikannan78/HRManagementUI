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
    this.api.getLogin(form).subscribe((data: any) => {
      console.log(data, 'geetha')
      if (data) {
        console.log(data, "role")
        this.userService.EmployeeId = data.employeeId;
        console.log(this.userService.EmployeeId, " this.userService.EmployeeId")

        this.userService.Role = data.role;
        console.log(this.userService.Role, " this.userService.Role")

        this.userService.Name = data.firstName + ' ' + data.lastName;
        console.log(this.userService.Name, "this.userService.Name")

        this.userService.Team=data.teamName;

        if (data.role == "Admin") {
          this.router.navigate(['main'], { replaceUrl: true });
        }
        else {
          this.router.navigate(['main'], { replaceUrl: true });
        }
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

}
