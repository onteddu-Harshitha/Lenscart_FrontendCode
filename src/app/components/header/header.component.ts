// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {

// }
 
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
//import { CartService } from './app/src/services/cart.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(public authService:AuthService , private router:Router){}
  ngOnInit(): void {}
  isMenuOpen = false;
isUserDropdownOpen = false;

toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
}

toggleUserDropdown(): void {
  this.isUserDropdownOpen = !this.isUserDropdownOpen;
}

get username(): number | null {
  return this.authService.getLoggedInUserId();
}

logout(): void {
  this.authService.logout();
  window.location.reload(); // or navigate to login
}

}
 
 