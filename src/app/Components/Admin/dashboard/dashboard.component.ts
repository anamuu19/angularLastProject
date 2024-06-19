import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  register: any;
  inst: any;
  hr: any;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.user();
    this.institution();
    this.manager();
  }

  user() {
    this.service.count().subscribe(response => {
      this.register = response;
    });
  }

  institution() {
    this.service.countInst().subscribe(response => {
      this.inst = response;
    });
    // Implement fetching institution data here
  }

  manager() {
    // Implement fetching manager data here
  }
}
