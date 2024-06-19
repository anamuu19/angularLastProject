import { Component } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { ManagerListService } from '../../../Services/Admin/manager-list.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdateManagerComponent } from '../update-manager/update-manager.component';
import { ManagerListService } from '../../../Services/Admin/manager-list.service';

@Component({
  selector: 'app-mananger-list',
  templateUrl: './mananger-list.component.html',
  styleUrl: './mananger-list.component.css'
})
export class ManangerListComponent {
  managerList!: any[];

  constructor(private managerService:ManagerListService,
    private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadManager();
  }

  loadManager(): void {
    this.managerService.getAllManager().subscribe({
      next: (response: any) => {
        console.log('Response from server:', response); // Debug log
        this.managerList = response;
        console.log('Updated managerList:', this.managerList); // Debug log
      },
      error: (err) => {
        console.error('Error fetching managers:', err); // Debug log
      }
    });
  }


  updateManager(id: number): void {
    this.openDialog(id, 'Update Manager');
  }

  addManager(): void {
    this.openDialog(0, 'Add Manager');
  }

  deleteManager(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this manager?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.managerService.deleteManager(id).subscribe({
          next: (response: any) => {
            this.loadManager();
            this.toastr.success('Manager deleted successfully');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Failed to delete Manager. Please try again.');
          }
        });
      }
    });
  }

  openDialog(id: number, title: any): void {
    const dialogRef = this.dialog.open(UpdateManagerComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadManager();
    });
  }

}
