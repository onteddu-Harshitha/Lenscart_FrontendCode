import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lenscartfrontend';

  role: string = '';

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';  // adjust if needed
  }


  menuOpen = false; // Fix: Added missing property

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Fix: Added missing method
    
  


  }
}
