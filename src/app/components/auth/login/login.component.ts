// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  // login(): void {
  //   this.authService.login(this.credentials).subscribe({
  //     next: (res) => {
  //       alert(res.message); // Optional: Show "Login successful"
  //       this.authService.saveToken(res.token); // Store JWT
  //       this.router.navigate(['/home']); // ✅ Redirect to home
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Login failed. Please check credentials.');
  //     },
  //   });
  // }
  // login(): void {
  //   this.authService.login(this.credentials).subscribe({
  //     next: (res) => {
  //       alert(res.message);
  //       this.authService.saveToken(res.token); // Save token
  //       localStorage.setItem("role", res.role); // ✅ Save role
  //       localStorage.setItem("customerId", res.customerId); // ✅ Save customerId
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Login failed. Please check credentials.');
  //     },
  //   });
  // }
  login(): void {
  this.authService.login(this.credentials).subscribe({
    next: (res) => {
      this.authService.saveToken(res.token);
      this.authService.saveRole(res.role);
      localStorage.setItem("customerId", res.customerId);

      if (res.role === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: (err) => {
      console.error(err);
      alert('Login failed. Please check credentials.');
    },
  });
}

  
}
