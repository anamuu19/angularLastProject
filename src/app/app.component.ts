import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lastAngularDevelopment';
  showFooter: boolean = true;
  transferRequestData: any; // Define or fetch transferRequestData here

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noFooterRoutes = ['/', '/register'];
        this.showFooter = !noFooterRoutes.includes(event.url);
      }
    });

    // Initialize or fetch transferRequestData here
    // this.transferRequestData = {
    //   current_institution: 'Current Institution Name',
    //   institution: 'Desired Institution Name',
    //   date: '2024-08-11',
    //   reason_for_transfer: 'Reason for Transfer',
    //   position: 'Current Position'
    // };
  }
}
