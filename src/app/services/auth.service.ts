// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private baseUrl = 'http://localhost:8085/api/auth'; // Backend API URL for auth
 
  constructor(private http: HttpClient) { }
 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token); // already handled
        this.saveRole(response.role);   // 👈 NEW: Save role separately
      })
    );
  }
 
  registerAdmin(admin: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/admin`, admin); // Admin registration endpoint
  }
 
  registerCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/customer`, customer, {
      responseType: 'text' as 'json'
    }); // Customer registration endpoint
  }
 
  logout(): void {
    localStorage.removeItem('jwtToken'); // Clear JWT token on logout
    localStorage.removeItem('userRole');
  }
 
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token); // Save JWT token to localStorage
  }
 
  getToken(): string | null {
    return localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
  }
 
  saveRole(role: string): void {
    localStorage.setItem('userRole', role); // Save user role (admin or customer)
  }
 
  getRole(): string | null {
    return localStorage.getItem('userRole'); // Retrieve user role
  }
 
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if the token is valid and not expired
  }
 
  getLoggedInUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
 
    const payload = this.decodeToken(token); // Decode JWT payload
    return payload ? payload.sub : null; // 'sub' is commonly used for user ID in JWTs
  }
 
  // Decode the JWT token and return the payload
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Get the payload from JWT
      return JSON.parse(atob(payload)); // Decode and parse payload
    } catch (e) {
      console.error('Error decoding JWT', e);
      return null;
    }
  }
 
  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true; // If token can't be decoded, consider it expired
 
    const exp = payload.exp; // 'exp' is commonly used for expiry in JWTs
    if (!exp) return true;
 
    const expiryDate = new Date(exp * 1000); // Convert exp from seconds to milliseconds
    return expiryDate < new Date(); // Check if the token has expired
  }
}