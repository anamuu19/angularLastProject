import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/Admin/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    email: '',
    password: '',
    newPassword: ''
  };
  showOldPassword = false;
  showNewPassword = false;

  toggleShowOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  userProfileImage = 'assets/profile-default.png'; // Replace with actual image source

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Check if the window object is available, which ensures the code is running in the browser
    if (typeof window !== 'undefined' && sessionStorage.getItem('userEmail')) {
      const email = sessionStorage.getItem('userEmail');

      if (email) {
        this.userService.getUserById(email).subscribe((data) => {
          this.user = data; // Populate form fields with fetched user data
        });
      }
    }
    // else {
    //   console.error('sessionStorage is not available. Make sure this code is running in a browser environment.');
    // }
  }

  changeProfilePicture() {
    // Logic to change profile picture
  }

  updateProfile() {
    const email = this.user.email;
    this.userService.updateUser(email, this.user).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // Handle successful update, show success message or redirect
      },
      (error) => {
        console.error('Error updating profile:', error);
        // Handle error, show error message
      }
    );
  }
}
