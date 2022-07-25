import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
  }

  dologin: FormGroup = new FormGroup({
    mailId: new FormControl(''),
    password: new FormControl('')
  });

  onSubmitt(form: any) {
    this.api.getLogin(form).subscribe(data => {
      console.log(data, 'login')
    });
  }

  onClick() {
    this.router.navigate(['/addUser']);
  }

}
