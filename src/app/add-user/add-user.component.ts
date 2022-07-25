import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUser: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mailId: new FormControl(''),
    password: new FormControl('')
  })

  loading: boolean = false;

  constructor(private router: Router, private api: ApiServiceService) {
  }

  ngOnInit(): void {
  }

  onSubmitt(form: any) {
    this.api.addUser(form).subscribe(data => {
      console.log(data, 'login')
    });
  }
}
