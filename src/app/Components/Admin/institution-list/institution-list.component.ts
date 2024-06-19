import { Component } from '@angular/core';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';
import { UpdateInstitutionComponent } from '../update-institution/update-institution.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent {
  institutionList!: any[];

  constructor(private instService:InstitutionListService,
    private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.instService.getAllInst().subscribe({
      next: (response: any) => {
        this.institutionList = response;
      }
    });
  }

  updateInst(id: number): void {
    this.openDialog(id, 'Update Institution');
  }

  addInstitution(): void {
    this.openDialog(0, 'Add Institution');
  }

  deleteInst(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this institution?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instService.deleteInstitution(id).subscribe({
          next: (response: any) => {
            this.loadInstitutions(); // Reload institutions after deletion
            this.toastr.success('Institution deleted successfully');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Failed to delete institution. Please try again.');
          }
        });
      }
    });
  }

  openDialog(id: number, title: any): void {
    const dialogRef = this.dialog.open(UpdateInstitutionComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadInstitutions();
    });
  }
}
