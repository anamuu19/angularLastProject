import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-letter',
  templateUrl: './download-letter.component.html',
  styleUrls: ['./download-letter.component.css']
})
export class DownloadLetterComponent implements OnInit {
  requests: any[] = [];
  displayedColumns: string[] = ['sn', 'namesColumn',  'Status', 'downloadLetter'];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserRequests();
  }

  getUserRequests(): void {
    if (typeof window !== 'undefined') { // Check if running in a browser environment
      const email = sessionStorage.getItem('userEmail'); // Get the user's email from sessionStorage

      if (email) {
        const url = `http://localhost:8080/url/requests/user/${email}`;
        this.http.get<any[]>(url).subscribe(
          (data: any[]) => {
            if (Array.isArray(data)) {
              this.requests = data;
            } else {
              console.error('Unexpected data format', data);
              this.toastr.error('Unexpected data format received');
            }
          },
          (error: HttpErrorResponse) => {
            console.error('Error fetching requests', error);
            this.toastr.error('Failed to fetch user requests');
          }
        );
      } else {
        console.error('User email not found in sessionStorage');
        this.toastr.error('User email not found. Please log in again.');
      }
    }
    // else {
    //   console.error('sessionStorage is not available');
    //   this.toastr.error('sessionStorage is not available.');
    // }
  }


  downloadLetter(requestId: number, institutionId: number): void {
    const url = `http://localhost:8080/api/letter/individual-letter/${requestId}/${institutionId}`;

    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'letter.pdf';
        link.click();
        URL.revokeObjectURL(link.href);
        this.toastr.success('Letter download initiated successfully');
      },
      (error: HttpErrorResponse) => {
        console.error('Error downloading letter', error);
        this.toastr.error('Failed to download letter');
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'accepted':
        return 'text-success';  // Green for accepted status
      case 'rejected':
        return 'text-danger';   // Red for rejected status
      case 'pending':
        return 'text-warning';
        case 'in process':
        return 'text-info;';   // Yellow for pending status
      default:
        return 'text-secondary' ; // Grey for other statuses
    }
  }

}
