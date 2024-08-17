import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/'])
  }

}
