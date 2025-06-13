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

  newSunglass: Sunglass = {
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
    this.fetchSunglasses();
  }

  fetchSunglasses(): void {
    this.sunglassService.getAllSunglasses().subscribe(data => {
      this.sunglasses = data;
    });
  }

  addSunglass(): void {
    this.sunglassService.addSunglass(this.newSunglass).subscribe(() => {
      this.fetchSunglasses();
      this.resetForm();
    });
  }

  deleteSunglass(id: string): void {
    this.sunglassService.deleteSunglass(id).subscribe(() => {
      this.fetchSunglasses();
    });
  }

  editSunglass(sunglass: Sunglass): void {
    this.newSunglass = { ...sunglass };
  }

  resetForm(): void {
    this.newSunglass = {
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
