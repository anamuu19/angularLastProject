import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';

@Component({
  selector: 'app-update-institution',
  templateUrl: './update-institution.component.html',
  styleUrls: ['./update-institution.component.css']
})
export class UpdateInstitutionComponent implements OnInit {
  inputData: any;
  closeMessage = 'close using directive';
  editData: any;
  myForm: FormGroup;
  isFormEmpty: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: InstitutionListService,
    private dialogRef: MatDialogRef<UpdateInstitutionComponent>,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.inputData = this.data;
    this.myForm = this.builder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.inputData.id > 0) {
      this.setPopupData(this.inputData.id);
    }
    // Subscribe to form value changes to update the form status
    this.myForm.valueChanges.subscribe(() => {
      this.isFormEmpty = this.myForm.invalid || this.myForm.pending;
    });
  }

  setPopupData(id: number) {
    this.service.getInstById(id).subscribe({
      next: (items: any) => {
        this.editData = items;
        this.myForm.patchValue({
          name: this.editData.name,
          address: this.editData.address,
          phoneNumber: this.editData.phoneNumber,
          email: this.editData.email
        });
        // Update the form status after patching values
        this.isFormEmpty = this.myForm.invalid || this.myForm.pending;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Failed to fetch institution data. Please try again.');
      }
    });
  }

  onSubmit() {
    if (this.isFormEmpty) {
      // If form is empty or invalid, display a warning and don't proceed
      this.toastr.warning('Please fill the form');
      return;
    }

    if (this.inputData.id > 0) {
      // Update operation
      this.service.updateInstitution(this.inputData.id, this.myForm.value).subscribe({
        next: () => {
          this.toastr.success('Institution updated successfully');
          this.closePopup();
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Failed to update institution. Please try again.');
        }
      });
    } else {
      // Add operation
      this.service.addInst(this.myForm.value).subscribe({
        next: () => {
          this.toastr.success('Institution added successfully');
          this.closePopup();
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Failed to add institution. Please try again.');
        }
      });
    }
  }

  closePopup() {
    // Close the dialog
    this.dialogRef.close('closed using function');
  }
}
