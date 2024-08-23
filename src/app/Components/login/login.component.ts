import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  email: string='';
  password: string='';
  role: string='';

  user: User = new User();

  roles : string[];


  loginForm!: FormGroup;


  constructor(private router: Router, private authService: AuthService,
    private toastr: ToastrService) {
      this.roles = [
        'Admin',
        'Staff',
        'Manager'
      ]
    }

  ngOnInit(): void {
    this.user.email = '';
    this.user.password = '';
    // this.user.name = '';

    // this.loginForm = new FormGroup({
    //   email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
    //   password: new FormControl('', Validators.required),
    //   role: new FormControl('',Validators.required)
    // });
  }

  onSubmit() {
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.role = this.role;

    this.authService.login(this.user).subscribe(res => {
      if (res == null) {
        this.toastr.error("Incorrect email or password ");
        this.ngOnInit();
      } else {
        console.log("Login successfully");

        // Store the token in sessionStorage
        sessionStorage.setItem("token", res.token);

        // Store the user's email in sessionStorage
        sessionStorage.setItem("userEmail", this.user.email);

        if (this.role === 'Staff') {
          this.toastr.success('Login successfully', 'Success Message');
          this.router.navigateByUrl("/user-dashboard");
        } else if (this.role === 'Admin') {
          this.toastr.success('Login successfully', 'Success Message');
          this.router.navigateByUrl("/layout");
        } else if (this.role === 'Manager') {
          this.toastr.success('Login successfully', 'Success Message');
          this.router.navigateByUrl("/navbar");
        }
      }
    }, err => {
      this.toastr.error("Login failed");
      this.ngOnInit();
    });
  }


}
