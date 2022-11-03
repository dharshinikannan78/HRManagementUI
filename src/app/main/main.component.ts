import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../service/api-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  isEmployee: boolean = true;
  showNavContent: boolean;
  isNavOpen: boolean = true;
  step: any;
  loggerName: string;
  loggerRole: string;
  notify: any;
  customStyle = {
    objectFit: "cover"
  };
  userService: any;
  isSuperUser: boolean;
  EmployeeId: any = localStorage.getItem('EmployeeId');
  baseUrl = this.api.photoUrl;
  isEmployeeOnly: boolean;
  constructor(public router: Router, userService: UserServiceService, private api: ApiServiceService) {
    this.step = 'step1';
    this.loggerRole = userService.Role;
    this.getImageForNav();
    this.isSuperUser = userService.getRole();
    this.isEmployeeOnly = userService.getEmpOnlyRole();
    this.getNotification();
  }




  openNav() {
    let sidenav = document.getElementById("sideNav");
    let main = document.getElementById("main");

    if (window.innerWidth < 600) {
      if (this.showNavContent == false) {
        sidenav.style.width = "0px";
        main.style.marginLeft = "0px";
        this.showNavContent = true;
      }
      else {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.showNavContent = false;
      }
    }
    else {
      if (this.showNavContent == false) {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.isNavOpen = true;
        this.showNavContent = true;
      }
      else {
        sidenav.style.width = "250px";
        main.style.marginLeft = "250px";
        this.isNavOpen = false;
        this.showNavContent = false;
      }
    }
  }

  shortNav(params: string) {
    let sidenav = document.getElementById("sideNav");
    let main = document.getElementById("main");

    if (window.innerWidth < 600) {
      this.router.navigate([params]);
      sidenav.style.width = "0px";
      main.style.marginLeft = "0px";
      this.isNavOpen = true;
      this.showNavContent = true;
    }

    else {
      sidenav.style.width = "60px";
      main.style.marginLeft = "60px";
      this.router.navigate([params]);
      this.isNavOpen = true;
      this.showNavContent = true;
    }
  }

  forNav: any[] = [];
  getImageForNav() {
    let role = localStorage.getItem('Role')
    if (role == 'Admin') this.isEmployee = false;

    this.api.getEmployeeDetailsById(localStorage.getItem("EmployeeId")).subscribe((data: any) => {
      this.forNav = data;
      this.loggerName = data[0].firstName + ' ' + data[0].lastName;
    })
  }

  logout = () => {
    Swal.fire({
      title: "Are you sure want to Logout ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'LogOut'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['./login']);
      }
    });
  }

  getNotification() {
    this.api.getNotification(this.EmployeeId).subscribe(data => {
      this.notify = data;

    })

  }
  notificationClick() {
    this.router.navigate(['leave']);
  }

  

}
