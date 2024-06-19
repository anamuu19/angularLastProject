import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../Services/Admin/user.service';
// import { UserService } from '../../../Services/Admin/user.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  updateUserForm!: FormGroup;
  positions: String[];
  inputData: any;
  closeMessage = 'close using directive';
  editData: any;
  isFormEmpty: boolean = true;

  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatePopupComponent>,
    private builder: FormBuilder,
    private userService: UserService
  ) {
    this.positions = [
      'HR Manager',
      'Accountant',
      'Financial Analyst',
      'Chief executive Officer',
      'Chief financial Officer',
      'Software Engineer',
      'Administrative Assistant',
      'Client Support Specialist'
    ];
    this.inputData = this.data;
    this.updateUserForm = this.builder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      telNo: ['', Validators.required],
      instInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.inputData.email) {
      this.setPopupData(this.inputData.email);
    }
    this.updateUserForm.valueChanges.subscribe(() => {
      this.isFormEmpty = this.updateUserForm.invalid || this.updateUserForm.pending;
    });
  }

  setPopupData(email: string) {
    this.userService.getUserById(email).subscribe({
      next: (data: any) => {
        this.editData = data;
        this.updateUserForm.patchValue({
          firstName: this.editData.firstName,
          middleName: this.editData.middleName,
          lastName: this.editData.lastName,
          telNo: this.editData.telNo,
          instInfo: this.editData.instInfo,
          email: this.editData.email,
          position: this.editData.position,
          role: this.editData.role,
          gender: this.editData.gender
        });
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Failed to fetch user data. Please try again.');
      }
    });
  }

  updateUser() {
    if (this.isFormEmpty) {
      this.toastr.warning('Please fill the form');
      return;
    }
    if (this.inputData.email) {
      this.userService.updateUser(this.inputData.email, this.updateUserForm.value).subscribe({
        next: () => {
          this.toastr.success('User updated successfully');
          this.closePopup();
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Failed to update user. Please try again.');
        }
      });
    }
  }

  closePopup() {
    this.dialogRef.close('closed using function');
  }
}
