import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lastAngularDevelopment';

  showFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // List of routes that should not show the footer
        const noFooterRoutes = ['/', '/register'];
        this.showFooter = !noFooterRoutes.includes(event.url);
      }
    });
  }


}
