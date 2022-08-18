import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  showNavContent: boolean;
  isNavOpen: boolean = true;
  step: any;
  constructor(public router: Router) {
    this.step = 'step1'
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
      this.router.navigate(['/main' + params]);
      sidenav.style.width = "0px";
      main.style.marginLeft = "0px";
      this.isNavOpen = true;
      this.showNavContent = true;
    }
    else {
      sidenav.style.width = "60px";
      main.style.marginLeft = "60px";
      this.router.navigate(['/main' + params]);
      this.isNavOpen = true;
      this.showNavContent = true;
    }
  }

}
