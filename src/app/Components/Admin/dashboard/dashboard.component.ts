import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TransferService } from '../../../Services/Manager/transfer.service';
import { ManagerListService } from '../../../Services/Admin/manager-list.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  register: any;
  inst: any;
  hr: any;
  // user: any;
  request: any;

  constructor(private service: AuthService, private transfer:TransferService,
    private managerList: ManagerListService) {}

  ngOnInit(): void {
    this.user();
    this.institution();
    this.manager();
    this.req();
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
    this.managerList.countManager().subscribe({
      next:(response:any)=>{
        this.hr = response
      }

    })
  }

  req(){
    this.transfer.countRequest().subscribe({
      next:(response:any)=>{
        this.request = response;
      }
    })
  }



  logout(){}







}
