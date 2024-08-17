import { Component, Input } from '@angular/core';
import { TransferService } from '../../../Services/Manager/transfer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-letter',
  templateUrl: './download-letter.component.html',
  styleUrls: ['./download-letter.component.css']
})
export class DownloadLetterComponent {
  // transferRequests: any[] = [];

  // constructor(private transferService: TransferService, private toastr: ToastrService) {}

  // ngOnInit(): void {
  //   this.viewTransferStatus();
  // }

  // viewTransferStatus(): void {
  //   this.transferService.getAllRequest().subscribe({
  //     next: (resp: any) => {
  //       this.transferRequests = resp;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching transfer status', err);
  //     }
  //   });
  // }

  // downloadLetter(request: any): void {
  //   this.transferService.downloadConfirmationLetter(request.id).subscribe({
  //     next: (response:any) => {
  //       const url = window.URL.createObjectURL(response);
  //       window.open(url);
  //     },
  //     error: (err) => {
  //       console.error('Error downloading confirmation letter', err);
  //       this.toastr.error('Failed to download letter. Please try again.');
  //     }
  //   });
  // }
}
