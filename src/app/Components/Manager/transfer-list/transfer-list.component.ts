import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerTransferService } from '../../../Services/manager-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { TransferService } from '../../../Services/Manager/transfer.service';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit {

  userList: any[] = [];
  searchText: string = '';

  constructor(
    private service: ManagerTransferService,
    private toastr: ToastrService,
    private transferService: TransferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewRequest();
  }

  viewRequest(): void {
    this.service.getAllRequest().subscribe({
      next: (resp: any) => {
        console.log('Fetched User List:', resp); // Log the fetched data
        this.userList = resp;
      },
      error: (err) => {
        console.error('Error fetching transfer requests', err);
      }
    });
  }

  delete(id: number): void {
    this.service.deleteRequest(id).subscribe({
      next: () => {
        this.toastr.success('Request deleted successfully');
        this.viewRequest();
      },
      error: (err) => {
        console.error('Error deleting transfer request', err);
      }
    });
  }

  confirm(data: any): void {
    if (data.status === 'accepted') {
        this.toastr.info('Request already processed');
        return;
    }

    const dialogRef = this.dialog.open(CommentDialogComponent, {
        width: '300px',
        data: { ...data }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            data.comment = result.comment;
            data.status = 'in process'; // Set status to 'In Process'

            this.transferService.addRequest(data).subscribe({
                next: () => {
                    this.toastr.success('Request sent to admin');
                    this.viewRequest(); // Refresh the list to show the updated status
                },
                error: (err) => {
                    console.error('Error confirming transfer request', err);
                }
            });
        }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'accepted':
        return 'text-success';  // Green for accepted status
      case 'rejected':
        return 'text-danger';   // Red for rejected status
      case 'pending':
        return 'text-warning'; // Yellow for pending status
      case 'in process':
        return 'text-primary'; // Blue for in process status
      default:
        return 'text-secondary'; // Grey for other statuses
    }
  }

  filteredUserList(): any[] {
    console.log('Search Text:', this.searchText); // Log search text
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
      (data.institution && data.institution.name.toLowerCase().includes(search)) || // Ensure `data.institution` is checked for null
      data.date.includes(this.searchText) ||
      data.reason_for_transfer.toLowerCase().includes(search) ||
      data.status.toLowerCase().includes(search)
    );
  }
}
