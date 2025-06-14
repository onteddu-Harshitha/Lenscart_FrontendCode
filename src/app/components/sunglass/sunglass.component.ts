import { Component, OnInit } from '@angular/core';
import { Sunglass, SunglassService } from 'src/app/services/sunglass.service';

@Component({
  selector: 'app-sunglasses',
  templateUrl: './sunglass.component.html',
  styleUrls: ['./sunglass.component.css']
})
export class SunglassComponent implements OnInit {

  sunglasses: Sunglass[] = [];
  filteredSunglasses: Sunglass[] = [];

  selectedBrand = '';
  selectedFrameColor = '';
  selectedPriceRange = '';

  brands: string[] = [];
  frameColors: string[] = [];

  constructor(private sunglassService: SunglassService) {}

  ngOnInit(): void {
    this.sunglassService.getAllSunglasses().subscribe(data => {
      this.sunglasses = data;
      this.filteredSunglasses = [...this.sunglasses];

      this.brands = [...new Set(this.sunglasses.map(s => s.brand))];
      this.frameColors = [...new Set(this.sunglasses.map(s => s.frameColor))];
    });
  }

  applyFilters(): void {
    this.filteredSunglasses = this.sunglasses.filter(s => {
      const matchBrand = this.selectedBrand ? s.brand === this.selectedBrand : true;
      const matchColor = this.selectedFrameColor ? s.frameColor === this.selectedFrameColor : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? s.price < 1000 :
        this.selectedPriceRange === '1000to2000' ? s.price >= 1000 && s.price <= 2000 :
        this.selectedPriceRange === 'above2000' ? s.price > 2000 : true;

      return matchBrand && matchColor && matchPrice;
    });
  }

  addToCart(sunglass: Sunglass): void {
    console.log('Adding to cart:', sunglass);
  }
}
