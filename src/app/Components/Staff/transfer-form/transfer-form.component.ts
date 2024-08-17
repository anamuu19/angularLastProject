import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../../../Services/Manager/transfer.service';
import { InstitutionListService } from '../../../Services/Admin/institution-list.service';
import { ToastrService } from 'ngx-toastr';
import { ManagerTransferService } from '../../../Services/manager-transfer.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']  // Corrected styleUrls
})
export class TransferFormComponent implements OnInit {
  instlist: any[] = [];
  transferForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ManagerTransferService,
    private instService: InstitutionListService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.viewInstitution();
    this.transferForm = this.fb.group({
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
      status: ['pending']
    });
  }

  viewInstitution() {
    this.instService.getAllInst().subscribe(data => {
      this.instlist = data;
      // console.log(data);
    });
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.service.addRequest(this.transferForm.value).subscribe({
        next: (resp: any) => {
          this.toastr.success('Request submitted successfully');
          console.log(resp);
          this.transferForm.reset();
        },
        error: (err: any) => {
          this.toastr.error('Failed to submit request');
          console.error(err);
        }
      });
    } else {
      this.toastr.error('Please fill all required fields.');
    }
  }
}
