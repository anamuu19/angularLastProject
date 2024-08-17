import { Component } from '@angular/core';
import { ManagerTransferService } from '../../../Services/manager-transfer.service';
import { RegisterStaffService } from '../../../Services/Manager/register-staff.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {
  register:any
  request:any

  constructor(private service: ManagerTransferService, private staff:RegisterStaffService) {}

  ngOnInit(): void {
    this.user();
    // this.institution();
    // this.manager();
    this.req();
  }

  user() {
    this.staff.countStaff().subscribe(response => {
      this.register = response;
    });
  }

  req() {
    this.service.countRequestManager().subscribe(response => {
      this.request = response;
    });
    // Implement fetching institution data here
  }


}
