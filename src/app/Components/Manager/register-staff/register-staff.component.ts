import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RegisterStaffService } from '../../../Services/Manager/register-staff.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../Admin/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.css']
})
export class RegisterStaffComponent implements OnInit {
  list!: any[];
  filteredList!: any[];
  staffForm!: FormGroup;
  instlist: any[] = [];
  private modalRef!: NgbModalRef;
  private currentStaffId!: number; // Add this line to keep track of the staff being edited

  constructor(
    private fb: FormBuilder,
    private staffService: RegisterStaffService,
    private toastr: ToastrService,
    private dialog:MatDialog,
    private instService: InstitutionListService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.viewStaff();
    this.viewInstitution();
  }

  initializeForm() {
    this.staffForm = this.fb.group({
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

  open(content: any) {
    this.modalRef = this.modalService.open(content, { size: 'md' });
  }

  viewStaff() {
    this.staffService.getAllStaff().subscribe(data => {
      this.list = data;
      this.filteredList = data; // Initialize filtered list
      // console.log(data);
    });
  }

  viewInstitution() {
    this.instService.getAllInst().subscribe(data => {
      this.instlist = data;
      // console.log(data);
    });
  }

  addStaff() {
    if (this.staffForm.valid) {
      this.staffService.addStaff(this.staffForm.value).subscribe(response => {
        this.toastr.success('Staff added successfully', 'Success');
        this.viewStaff();
        this.staffForm.reset();
        this.modalRef.close();
      }, error => {
        console.error('Error adding staff', error);
      });
    }
  }

  deleteStaff(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this staff?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.staffService.deleteStaff(id).subscribe({
          next: (response: any) => {
            this.viewStaff(); // Reload institutions after deletion
            this.toastr.success('Staff deleted successfully');
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Failed to delete staff. Please try again.');
          }
        });
      }
    });
  }

  editStaff(staff: any) {
    this.currentStaffId = staff.id;
    this.staffForm.patchValue({
      firstName: staff.firstName,
      middleName: staff.middleName,
      lastName: staff.lastName,
      email: staff.email,
      phoneNumber: staff.phoneNumber,
      address: staff.address,
      gender: staff.gender,
      institution: staff.institution
    });
    // this.open(update); // Open the update modal
  }

  requestStaff(staff:any){
    this.currentStaffId = staff.id;
    this.staffForm.patchValue({
      firstName: staff.firstName,
      middleName: staff.middleName,
      lastName: staff.lastName,
      email: staff.email,
      phoneNumber: staff.phoneNumber,
      address: staff.address,
      gender: staff.gender,
      // institution: staff.institution
    });
  }

  initializeRequest(){
    this.staffForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      current_institution: ['', Validators.required],
      institution: ['', Validators.required],
      date: ['', Validators.required],
      reason_for_transfer: ['', Validators.required],
    });

  }

  makeRequest() {
    // Implement request logic here
  }

  updateStaff() {
    if (this.staffForm.valid) {
      this.staffService.updateStaff(this.currentStaffId, this.staffForm.value).subscribe(response => {
        this.toastr.success('Staff updated successfully', 'Success');
        this.viewStaff();
        this.staffForm.reset();
        this.modalRef.close();
      }, error => {
        console.error('Error updating staff', error);
      });
    }
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toLowerCase();
    this.filteredList = this.list.filter(staff =>
      staff.firstName.toLowerCase().includes(query) ||
      staff.middleName.toLowerCase().includes(query) ||
      staff.lastName.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.phoneNumber.includes(query) ||
      staff.address.toLowerCase().includes(query) ||
      staff.gender.toLowerCase().includes(query) ||
      staff.institution.toLowerCase().includes(query)
    );
  }

}
