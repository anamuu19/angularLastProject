import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrl: './manager-navbar.component.css'
})
export class ManagerNavbarComponent {
  constructor(private router:Router){}

  logOut(){
      localStorage.removeItem('user')
      this.router.navigateByUrl("/")


  }

}
