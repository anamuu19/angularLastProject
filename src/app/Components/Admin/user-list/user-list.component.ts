import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';
import { AuthService } from '../../../Services/auth.service';
// import { UserService } from '../../../Services/Admin/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../Services/Admin/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any[] = [];

  constructor(
    private service: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getAll().subscribe({
      next: (response: any) => {
        this.userList = response;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Failed to load users');
      }
    });
  }

  update(email: string): void {
    this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '30%',
      height: '80%',
      data: {
        email: email  // Use email as the identifier
      }
    }).afterClosed().subscribe(() => {
      this.loadUsers(); // Reload the list after closing the update dialog
    });
  }

  delete(email: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(email).subscribe({
          next: () => {
            this.toastr.success('User deleted successfully');
            this.loadUsers(); // Reload users after deletion
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Failed to delete user. Please try again.');
          }
        });
      }
    });
  }
}
