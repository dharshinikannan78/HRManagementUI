import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  customStyle = {
    objectFit: "cover"
  };
  userService: any;

  constructor(public router: Router, userService: UserServiceService, private api: ApiServiceService) {
    this.step = 'step1'
    // this.loggerName = userService.Name;
    this.loggerRole = userService.Role;
    this.getImageForNav();
  }




  openNav() {
    let sidenav = document.getElementById("sideNav");
    let main = document.getElementById("main");
    if (window.innerWidth < 600) {
      console.log(window.innerWidth, "widhth")
      if (this.showNavContent == false) {
        sidenav.style.width = "0px";
        main.style.marginLeft = "0px";
        this.showNavContent = true;
        console.log(this.showNavContent, "to hide")
      }
      else {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.showNavContent = false;
        console.log(this.showNavContent, "for shpow")
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
  forNav: any;
  getImageForNav() {
    let role = localStorage.getItem('Role')
    if (role == 'Admin') this.isEmployee = false;

    this.api.getEmployeeDetailsById(localStorage.getItem("EmployeeId")).subscribe((data: any) => {
      console.log(data, 'data');
      this.forNav = data;
      this.loggerName = data[0].firstName + ' ' + data[0].lastName;
    })
  }
  logout = () => {
    this.router.navigate(['./login']);
  }
}
