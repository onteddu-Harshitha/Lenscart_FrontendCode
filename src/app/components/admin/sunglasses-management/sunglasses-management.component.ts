// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sunglasses-management',
//   templateUrl: './sunglasses-management.component.html',
//   styleUrls: ['./sunglasses-management.component.css']
// })
// export class SunglassesManagementComponent {

// }
import { Component, OnInit } from '@angular/core';
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
    quantity: 0
  };

  constructor(private sunglassService: SunglassService) {}

  ngOnInit(): void {
    this.loadSunglasses();
  }

  loadSunglasses(): void {
    this.sunglassService.getAllSunglasses().subscribe(data => this.sunglasses = data);
  }

  addOrUpdateSunglass(): void {
    this.sunglassService.addSunglass(this.sunglassData).subscribe(() => {
      this.loadSunglasses();
      this.resetForm();
    });
  }

  editSunglass(sunglass: Sunglass): void {
    this.sunglassData = { ...sunglass };
  }

  deleteSunglass(id: string): void {
    this.sunglassService.deleteSunglass(id).subscribe(() => this.loadSunglasses());
  }

  resetForm(): void {
    this.sunglassData = {
      sunGlassId: '',
      sunGlassName: '',
      brand: '',
      price: 0,
      frameColor: '',
      frameShape: '',
      glassColor: '',
      quantity: 0
    };
  }
}
