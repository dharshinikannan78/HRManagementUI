import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from './service/api-service.service';
import { UserServiceService } from './service/user-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hrmanagementapplication';

  showNavContent: boolean;
  isNavOpen: boolean = true;
  step: any;
  currentUser: string = localStorage.getItem('userName');
    role: string = localStorage.getItem('Role')
  
  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userService: UserServiceService) {
    this.step = 'step1'
  }
  logout = () => {
    this.api.logout();
    this.router.navigate(['./login']);

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

}
