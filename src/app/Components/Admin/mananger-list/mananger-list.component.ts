import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdateManagerComponent } from '../update-manager/update-manager.component';
import { ManagerListService } from '../../../Services/Admin/manager-list.service';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';

@Component({
  selector: 'app-mananger-list',
  templateUrl: './mananger-list.component.html',
  styleUrls: ['./mananger-list.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ManangerListComponent implements OnInit {
  managerList: any[] = []; // Initialized managerList
  filteredManagerList: any[] = []; // Add filteredManagerList property
  searchTerm: string = ''; // Add searchTerm property
  institutionList: any[] = []; // Add institutionList property

  constructor(
    private managerService: ManagerListService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private institutionListService: InstitutionListService
  ) {}

  ngOnInit(): void {
    this.loadManager();
    this.fetchInst();
  }

  loadManager(): void {
    this.managerService.getAllManager().subscribe({
      next: (response: any) => {
        this.managerList = response;
        this.filteredManagerList = response; // Initialize filtered list
      },
      error: (err) => {
        this.toastr.error('Failed to load managers. Please try again.');
      }
    });
  }

  fetchInst(): void {
    this.institutionListService.getAllInst().subscribe({
      next: (response: any) => {
        this.institutionList = response;
      },
      error: (err) => {
        this.toastr.error('Failed to load institutions. Please try again.');
      }
    });
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredManagerList = this.managerList.filter(manager =>
        manager.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.middleName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.gender.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        manager.institution?.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredManagerList = this.managerList;
    }
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
            this.toastr.error('Failed to delete manager. Please try again.');
          }
        });
      }
    });
  }

  openDialog(id: number, title: string): void {
    const dialogRef = this.dialog.open(UpdateManagerComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadManager();
      }
    });
  }
}
