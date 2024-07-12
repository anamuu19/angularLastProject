import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ManagerListService } from '../../../Services/Admin/manager-list.service';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit {
  inputData: any;
  closeMessage = 'close using directive';
  editData: any;
  myForm!: FormGroup;
  isFormEmpty: boolean = true;
  instList: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ManagerListService,
    private instServices: InstitutionListService,
    private dialogRef: MatDialogRef<UpdateManagerComponent>,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) {
    this.inputData = this.data;
    this.myForm = this.builder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      institution: ['', Validators.required]
    });
  }

  viewInstitution() {
    this.instServices.getAllInst().subscribe(data => {
      this.instList = data;
    }, error => {
      console.error('Failed to fetch institutions', error);
      this.toastr.error('Failed to fetch institutions. Please try again.');
    });
  }

  ngOnInit(): void {
    this.viewInstitution();
    if (this.inputData.id > 0) {
      this.setPopupData(this.inputData.id);
    }

    this.myForm.valueChanges.subscribe(() => {
      this.isFormEmpty = this.myForm.invalid || this.myForm.pending;
    });
  }

  setPopupData(id: number) {
    this.service.getManagerById(id).subscribe({
      next: (items: any) => {
        this.editData = items;
        this.myForm.patchValue({
          firstName: items.firstName,
          middleName: items.middleName,
          lastName: items.lastName,
          email: items.email,
          phoneNumber: items.phoneNumber,
          address: items.address,
          gender: items.gender,
          institution: items.institution?.id // Use the institution id here
        });
        this.isFormEmpty = this.myForm.invalid || this.myForm.pending;
      },
      error: (error: any) => {
        console.error('Fetch error:', error);
        this.toastr.error('Failed to fetch manager data. Please try again.');
      }
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.toastr.warning('Please fill the form');
      return;
    }

    const managerData = {
      ...this.myForm.value,
      institution: this.instList.find(inst => inst.id === this.myForm.value.institution) // Assuming institution is an object and the form holds its id
    };

    if (this.inputData.id > 0) {
      this.service.updateManager(this.inputData.id, managerData).subscribe({
        next: () => {
          this.toastr.success('Manager updated successfully');
          this.closePopup();
        },
        error: (error: any) => {
          console.error('Update error:', error);
          this.toastr.error('Failed to update manager. Please try again.');
        }
      });
    } else {
      this.service.addManager(managerData).subscribe({
        next: () => {
          this.toastr.success('Manager added successfully');
          this.closePopup();
        },
        error: (error: any) => {
          console.error('Add error:', error);
          this.toastr.error('Failed to add manager. Please try again.');
        }
      });
    }
  }

  closePopup() {
    this.dialogRef.close('closed using function');
  }
}
