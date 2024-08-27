import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../Services/Manager/transfer.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  userList: any[] = [];
  searchText: string = '';

  constructor(
    private service: TransferService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewRequest();
  }

  viewRequest(): void {
    this.service.getAllRequest().subscribe({
      next: (resp: any) => {
        this.userList = resp;
        console.log(resp);
      },
      error: (err) => {
        console.error('Error fetching transfer requests', err);
      }
    });
  }

  filteredUserList(): any[] {
    if (!this.searchText) {
      return this.userList;
    }

    const search = this.searchText.toLowerCase();
    return this.userList.filter(data =>
      data.firstName.toLowerCase().includes(search) ||
      data.middleName.toLowerCase().includes(search) ||
      data.lastName.toLowerCase().includes(search) ||
      data.email.toLowerCase().includes(search) ||
      data.phoneNumber.includes(this.searchText) ||
      data.address.toLowerCase().includes(search) ||
      data.gender.toLowerCase().includes(search) ||
      data.current_institution.toLowerCase().includes(search) ||
      (data.institution && data.institution.name.toLowerCase().includes(search)) ||
      data.date.includes(this.searchText) ||
      data.reason_for_transfer.toLowerCase().includes(search) ||
      data.comment.toLowerCase().includes(search) ||
      data.status.toLowerCase().includes(search)
    );
  }

  confirmRequest(data: any): void {
    if (data.status === 'accepted') {
      this.toastr.info('Request already accepted');
      return;
    }

    data.status = 'accepted'; // Status set to 'accepted' at the admin level
    this.service.confirmRequest(data.id, data).subscribe({
      next: () => {
        this.toastr.success('Request accepted successfully');
        this.viewRequest(); // Refresh the list
      },
      error: (err) => {
        console.error('Error approving transfer request', err);
      }
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this request?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteRequest(id).subscribe({
          next: (response: any) => {
            this.viewRequest(); // Reload institutions after deletion
            this.toastr.success('Request deleted successfully');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Failed to delete request. Please try again.');
          }
        });
      }
    });
  }

  downloadLetter(requestId: number, institutionId: number): void {
    const url = `http://localhost:8080/api/letter/individual-letter/${requestId}/${institutionId}`;
    window.open(url, '_blank');
    this.toastr.success('Letter download initiated successfully');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'accepted':
        return 'text-success';  // Green for accepted status
      case 'rejected':
        return 'text-danger';   // Red for rejected status
      case 'in process':
        return 'text-primary';  // Blue for in process status
      default:
        return 'text-secondary'; // Grey for other statuses
    }
  }

  rejectRequest(data: any): void {
    if (data.status === 'accepted') {
      this.toastr.info('Request already accepted');
      return;
    }

    data.status = 'rejected'; // Status set to 'rejected'
    this.service.rejectRequest(data.id, data).subscribe({
      next: () => {
        this.toastr.success('Request rejected successfully');
        this.viewRequest(); // Refresh the list
      },
      error: (err) => {
        console.error('Error rejecting transfer request', err);
        this.toastr.error('Error rejecting transfer request. Please try again.');
      }
    });
  }
}
