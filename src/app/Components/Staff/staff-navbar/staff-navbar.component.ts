import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../Services/Manager/transfer.service';

@Component({
  selector: 'app-staff-navbar',
  templateUrl: './staff-navbar.component.html',
  styleUrls: ['./staff-navbar.component.css']
})
export class StaffNavbarComponent  {
  // isRequestConfirmed: boolean = false;
  // transferRequestData: any;

  // constructor(private transferService: TransferService) {}

  // ngOnInit() {
  //   this.transferService.getAllRequest().subscribe((data: any) => {
  //     console.log('Fetched Transfer Requests:', data);
  //     const confirmedRequest = data.find((request: any) => request.status === 'accepted');
  //     console.log('Confirmed Request:', confirmedRequest);
  //     if (confirmedRequest) {
  //       this.transferRequestData = confirmedRequest;
  //       this.isRequestConfirmed = true;
  //     } else {
  //       this.isRequestConfirmed = false;
  //     }
  //     console.log('Is Request Confirmed:', this.isRequestConfirmed);
  //   });
  // }
}
