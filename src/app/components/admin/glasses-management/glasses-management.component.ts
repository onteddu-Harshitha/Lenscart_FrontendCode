// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-glasses-management',
//   templateUrl: './glasses-management.component.html',
//   styleUrls: ['./glasses-management.component.css']
// })
// export class GlassesManagementComponent {

// }
import { Component, OnInit } from '@angular/core';
import { GlassService, Glass } from 'src/app/services/glass.service'; // ✅ MATCH THIS

@Component({
  selector: 'app-glasses-management',
  templateUrl: './glasses-management.component.html',
  styleUrls: ['./glasses-management.component.css']
})
export class GlassesManagementComponent implements OnInit {

  glasses: Glass[] = [];

  newGlass: Glass = {
    glassId: '',
    brand: '',
    glassImage: '',
    glassName: '',
    powerRange: 0,
    type: '',
    price: 0,
    quantity: 0
  };

  constructor(private glassService: GlassService) {}

  ngOnInit(): void {
    this.fetchGlasses();
  }

  fetchGlasses(): void {
    this.glassService.getAllGlasses().subscribe(data => {
      this.glasses = data;
    });
  }

  addGlass(): void {
    this.glassService.addGlass(this.newGlass).subscribe(() => {
      this.fetchGlasses();
      this.resetForm();
    });
  }

  deleteGlass(id: string): void {
    this.glassService.deleteGlass(id).subscribe(() => {
      this.fetchGlasses();
    });
  }

  editGlass(glass: Glass): void {
    this.newGlass = { ...glass };
  }

  resetForm(): void {
    this.newGlass = {
      glassId: '',
      brand: '',
      glassImage: '',
      glassName: '',
      powerRange: 0,
      type: '',
      price: 0,
      quantity: 0
    };
  }
}
