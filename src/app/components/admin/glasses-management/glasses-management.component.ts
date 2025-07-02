
import { Component, OnInit } from '@angular/core';
import { Glass, GlassService } from 'src/app/services/glass.service';

@Component({
  selector: 'app-glass-management',
  templateUrl: './glasses-management.component.html',
  styleUrls: ['./glasses-management.component.css']
})
export class GlassesManagementComponent implements OnInit {

  glasses: Glass[] = [];
  glassData: Glass = this.resetData();
  isEditMode = false;
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
    this.loadGlasses();
  }

  loadGlasses(): void {
    this.glassService.getAllGlasses().subscribe(data => this.glasses = data);
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.glassService.updateGlass(this.glassData).subscribe(() => {
        this.loadGlasses();
        this.resetForm();
      });
    } else {
      this.glassService.addGlass(this.glassData).subscribe(() => {
        this.loadGlasses();
        this.resetForm();
      });
    }
  }

  editGlass(glass: Glass): void {
    this.glassData = { ...glass };
    this.isEditMode = true;
  }

  deleteGlass(glassId: string): void {
    if (confirm('Are you sure you want to delete this glass?')) {
      this.glassService.deleteGlass(glassId).subscribe(() => this.loadGlasses());
    }
  }

  resetForm(): void {
    this.glassData = this.resetData();
    this.isEditMode = false;
  }

  resetData(): Glass {
    return {
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
