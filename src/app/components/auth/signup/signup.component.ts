import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
 
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  phoneNumber = '';
  errorMessage = '';
  successMessage = '';
 
  constructor(private authService: AuthService, private router: Router) { }
 
  onSignup(): void {
    const customer = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      phoneNumber: this.phoneNumber
    };
 
    // Clear previous error
    this.errorMessage = '';
    this.successMessage = '';
 
 
    this.authService.registerCustomer(customer).subscribe({
      next: () => {
 
        this.successMessage = 'Registration successful! Redirecting to login...';
 
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Signup failed:', err);
 
        // Handle common error responses
        if (err.status === 409 || (err.error && err.error.includes('Email already exists'))) {
          this.errorMessage = 'Email already exists';
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid signup details. Please check your inputs.';
        } else if (err.status === 0) {
          this.errorMessage = 'Server not reachable. Please try again later.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
 
        // Optional: Display alert
        // alert(this.errorMessage);
 
      }
    });
  }
}