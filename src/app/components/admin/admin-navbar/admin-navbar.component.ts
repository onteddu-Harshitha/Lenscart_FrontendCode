// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-navbar',
//   templateUrl: './admin-navbar.component.html',
//   styleUrls: ['./admin-navbar.component.css']
// })
// export class AdminNavbarComponent {
// // sidebar.component.ts
// isVisible = true;

// toggleNavbar() {
//   this.isVisible = !this.isVisible;
// }

// }
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  @Input() isVisible = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  toggleNavbar() {
    this.toggleSidebar.emit();
  }
}
