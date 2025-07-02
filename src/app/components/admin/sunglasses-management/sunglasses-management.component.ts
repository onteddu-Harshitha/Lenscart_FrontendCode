import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SunglassService, Sunglass } from 'src/app/services/sunglass.service';
 
@Component({
  selector: 'app-sunglasses-management',
  templateUrl: './sunglasses-management.component.html',
  styleUrls: ['./sunglasses-management.component.css']
})
export class SunglassesManagementComponent implements OnInit {
 
  sunglasses: Sunglass[] = [];
  sunglassData: Sunglass = {
    sunGlassId: '',
    sunGlassName: '',
    brand: '',
    price: 0,
    frameColor: '',
    frameShape: '',
    glassColor: '',
    quantity: 0,
    image: '',
  };
 
  constructor(private sunglassService: SunglassService, private cdr: ChangeDetectorRef) { }
 
  ngOnInit(): void {
    console.log('Component initialized');
    this.loadSunglasses();
  }
 
 
  loadSunglasses(): void {
    console.log('Loading sunglasses...');
    this.sunglassService.getAllSunglasses().subscribe(data => {
      this.sunglasses = data;
      console.log('Sunglasses loaded:', data);
      this.cdr.detectChanges(); // Force UI update
    });
  }
 
 
  addOrUpdateSunglass(): void {
    const isUpdate = this.sunglasses.some(s => s.sunGlassId === this.sunglassData.sunGlassId);
 
    if (isUpdate) {
      console.log('Updating sunglass with quantity:', this.sunglassData.quantity); // ✅ Add this line
      this.sunglassService.updateSunglass(this.sunglassData).subscribe(() => {
        console.log('Sunglass updated successfully');
        this.loadSunglasses();
        this.resetForm();
      });
    } else {
      console.log('Adding new sunglass:', this.sunglassData);
      this.sunglassService.addSunglass(this.sunglassData).subscribe(() => {
        console.log('Sunglass added successfully');
        this.loadSunglasses();
        this.resetForm();
      });
    }
  }
 
 
  editSunglass(sunglass: Sunglass): void {
    console.log('Editing sunglass:', sunglass);
    console.log(this.sunglassData.quantity)
    this.sunglassData = { ...sunglass };
  }
 
  deleteSunglass(id: string): void {
    console.log('Deleting sunglass with ID:', id);
    this.sunglassService.deleteSunglass(id).subscribe(() => {
      console.log('Sunglass deleted');
      this.sunglasses = this.sunglasses.filter(s => s.sunGlassId !== id);
    });
  }
 
 
  resetForm(): void {
    console.log('Resetting form');
    this.sunglassData = {
      sunGlassId: '',
      sunGlassName: '',
      brand: '',
      price: 0,
      frameColor: '',
      frameShape: '',
      glassColor: '',
      quantity: 0,
      image: ''
    };
  }
}