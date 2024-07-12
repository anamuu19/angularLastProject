import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../Services/Manager/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  userList: any[] = [];
  searchText: string = '';

  constructor(private service: TransferService) {}

  ngOnInit(): void {
    this.viewRequest();
  }

  viewRequest(): void {
    this.service.getAllRequest().subscribe({
      next: (resp: any) => {
        this.userList = resp;
      },
      error: (err) => {
        console.error('Error fetching transfer requests', err);
      }
    });
  }

  filteredUserList(): any[] {
    return this.userList.filter(data =>
      data.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.middleName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.phoneNumber.includes(this.searchText) ||
      data.address.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.gender.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.current_institution.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.institution.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.date.includes(this.searchText) ||
      data.reason_for_transfer.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  confirm(): void {
    // Implement update logic here
  }

  delete(id: number): void {
    // Implement delete logic here
  }
}
