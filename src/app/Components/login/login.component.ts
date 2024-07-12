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

  email: String='';
  password: String='';
  role: String='';

  user: User = new User();

  roles : String[];


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
      console.log(res)
      if(res == null){
        this.toastr.error("Incorrect email or password ");
        this.ngOnInit();
      } else{
        console.log("Login successfully");
        localStorage.setItem("token",res.token);
        if(this.role == 'Staff'){
          this.toastr.success('Login successfully','Success Message')
          this.router.navigateByUrl("/user-dashboard");

        }
        if(this.role == 'Admin'){
          this.toastr.success('Login successfully','Success Message')
          this.router.navigateByUrl("/layout")
        }
        if(this.role == 'Manager'){
          this.toastr.success('Login successfully','Success Message')
          this.router.navigateByUrl("/navbar")
        }

      }
    }, err => {
      this.toastr.error("Login failed");
      this.ngOnInit();
    }
    )






    // const username = this.loginForm.get('username')?.value;
    // const password = this.loginForm.get('password')?.value;

    // if (username === 'Admin' && password === 'admin@123') {
    //   this.toastr.success('Login successfully')
    //   this.router.navigateByUrl('/layout');

    // }
    // else if (username === 'Manager' && password === 'manager@123') {
    //   this.toastr.success('Login successfully')
    //   this.router.navigateByUrl('/manager-navbar');

    // }

    // this.authService.getUser(this.loginForm.value).subscribe({
    //   next: (response: any) => {
    //     if (response && response[0].username) {
    //       localStorage.setItem('user', JSON.stringify(response[0]))
    //       this.toastr.success('Login successfully')
    //       this.router.navigateByUrl("staff-navbar")
    //     }
    //     else {
    //       this.toastr.warning('user not found', 'Please register')
    //       this.router.navigateByUrl("/");

    //     }
    //   }

    // })
  }
}
