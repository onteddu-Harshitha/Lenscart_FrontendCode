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
showPassword = false;

togglePassword(): void {
  this.showPassword = !this.showPassword;
}

 
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
