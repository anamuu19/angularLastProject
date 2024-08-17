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

  confirmRequest(data: any): void {
    if (data.status === 'accepted') {
      this.toastr.info('Request already accepted');
      return;
    }

    data.status = 'accepted'; // Status set to 'approved' at the admin level
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
}
