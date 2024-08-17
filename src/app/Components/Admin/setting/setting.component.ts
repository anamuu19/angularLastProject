import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  settingsForm!:FormGroup
  // roles: string[] = ['Admin', 'Manager', 'User'];


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSettings();
  }

  initializeForm() {
    this.settingsForm = this.fb.group({
      appTitle: ['', Validators.required],
      theme: ['light', Validators.required],
      maxUsers: [100, [Validators.required, Validators.min(1)]],
      userRoles: ['user', Validators.required],
      autoBackup: [false],
      backupInterval: [7, [Validators.required, Validators.min(1)]]
    });
  }

  loadSettings() {
    // Load settings from a service or backend API
    // Example:
    const settings = {
      appTitle: 'Staff Management System',
      theme: 'light',
      maxUsers: 100,
      userRoles: 'user',
      autoBackup: true,
      backupInterval: 7
    };

    this.settingsForm.patchValue(settings);
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      // Save settings via a service or backend API
      console.log('Settings saved:', this.settingsForm.value);
      this.toastr.success('Settings saved successfully');
    } else {
      this.toastr.error('Please fill out the form correctly');
    }
  }
}
