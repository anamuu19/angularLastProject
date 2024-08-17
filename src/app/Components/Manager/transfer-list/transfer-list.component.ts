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
    // if (data.status === 'accepted' || data.status === 'approved') {
    //   this.toastr.info('Request already processed');
    //   return;
    // }

    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '300px',
      data: { ...data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // data.status = 'accepted';
        data.comment = result.comment;

        this.transferService.addRequest(data).subscribe({
          next: () => {
            this.toastr.success('Request sending to admin');
            this.viewRequest();
            // this.sendToAdmin(data);
          },
          error: (err) => {
            console.error('Error confirming transfer request', err);
          }
        });
      }
    });
  }

  // sendToAdmin(data: any): void {
  //   data.status = 'in process'; // Status set to 'in process' when sending to admin
  //   this.transferService.addRequest(data).subscribe({
  //     next: () => {
  //       this.toastr.success('Data sent to admin successfully');
  //     },
  //     error: (err) => {
  //       console.error('Error sending data to admin', err);
  //     }
  //   });
  // }


  reject(data: any): void {
    if (data.status === 'rejected') {
      this.toastr.info('Request rejected');
      return;
    }
    data.status = 'rejected'
    this.service.rejectRequest(data.id,data).subscribe({
      next:(response:any)=>{
        this.toastr.error('Request is rejected')
        console.log(response)
      },
      error:(err)=>{
        console.log(err)


      }
    })

    // if (data.status === 'accepted') {
    //   this.toastr.info('Request already accepted');
    //   return; // Do not allow rejection if already accepted
    // }

    // data.status = 'rejected';
    // this.service.updateRequest(data.id, data).subscribe({
    //   next: () => {
    //     this.toastr.success('Request rejected successfully');
    //     this.viewRequest();
    //   },
    //   error: (err) => {
    //     console.error('Error rejecting transfer request', err);
    //   }
    // });
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
      data.reason_for_transfer.toLowerCase().includes(this.searchText.toLowerCase()) ||
      data.status.toLowerCase().includes(this.searchText.toLowerCase()) // Include status in search
    );
  }
}
