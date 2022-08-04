import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  applyOnLeave: FormGroup = new FormGroup({

  });
  constructor() { }

  ngOnInit(): void {
  }
  applyLeave() {
    console.log('geetha')
  }
}
