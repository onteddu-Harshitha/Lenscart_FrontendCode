import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  
  constructor(private router: Router) {}


 goTo(category: string): void {
  const routesMap: { [key: string]: string } = {
    lenses: '/admin/lenses-management',
    frames: '/admin/frames-management',
    glasses: '/admin/glasses-management',
    sunglasses: '/admin/sunglasses-management'
  };

  const route = routesMap[category];
  if (route) {
    this.router.navigate([route]);
  } else {
    console.warn(`Unknown category: ${category}`);
  }
}

}
