import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  testimonials = [
  { name: 'Anita R.', message: 'Stylish glasses, quick delivery. Highly recommend!' },
  { name: 'Rahul K.', message: 'Best customer service and quality frames.' },
  { name: 'Meena D.', message: 'Loved the collection! Got compliments already.' }
];

topProducts = [
  { id: 101, name: 'Classic Black Frame', price: 1999, image: 'assets/image/frame.png' },
  { id: 102, name: 'Smart Blue Lens', price: 1499, image: 'assets/image/lenses.png' },
  { id: 103, name: 'Golden Aviators', price: 2599, image: 'assets/image/sunglass.png' },
  { id: 104, name: 'Kids Glasses Pack', price: 999, image: 'assets/image/glass.png' }
];



  navigateTo(route: string) {
    this.router.navigate(['/' + route]);
  }
}
