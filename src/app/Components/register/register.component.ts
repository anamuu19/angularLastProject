import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  email: string = '';
  password: string = '';
  confirm: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  instInfo: string = '';
  telNo: string = '';
  position: string = '';
  gender: string = '';
  positions: string[];

  user: User = new User();

  registerForm!: FormGroup;

  constructor(private toastr: ToastrService, private service: AuthService, private router: Router) {
    this.positions = [
      'HR Manager',
      'Accountant',
      'Financial Analyst',
      'Chief executive Officer',
      'Chief financial Officer',
      'Software Engineer',
      'Administrative Assistant',
      'Client Support Specialist'
    ]
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      instInfo: new FormControl('', Validators.required),
      telNo: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }

  proceedRegistration(): void {

    if (this.registerForm.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirm) {
      this.toastr.error('Password and confirm password do not match');
      return;
    }

    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.firstName = this.registerForm.value.firstName;
    this.user.middleName = this.registerForm.value.middleName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.instInfo = this.registerForm.value.instInfo;
    this.user.telNo = this.registerForm.value.telNo;
    this.user.position = this.registerForm.value.position;
    this.user.gender = this.registerForm.value.gender;
    this.user.role = 'user';

    this.service.registration(this.user).subscribe(
      (response:any) => {
        console.log(response)
        this.toastr.success('Registration successful');
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error('Registration failed:', error);
        this.toastr.error('Registration failed. Please try again.');
      }
    );
  }

}
