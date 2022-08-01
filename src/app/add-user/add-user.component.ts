import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  submitted = false;
  addUser: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mailId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  loading: boolean = false;

  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
  }

  onSubmitt(form: any) {
    this.api.addUser(form).subscribe(data => {
      Swal.fire({
        text: 'Register Sucessfully!',
        icon: 'success',
        timer: 2500
      });
      this.addUser.reset();
    });
    this.router.navigate(['/login']);
  }

  thisFormValid() {
    if (this.addUser.invalid) {
      return true;
    }
    return false;
  }
  get f() { return this.addUser.controls }
}
