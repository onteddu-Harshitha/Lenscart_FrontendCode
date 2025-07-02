import { Component, OnInit } from '@angular/core';
import { Sunglass, SunglassService } from 'src/app/services/sunglass.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private sunglassService: SunglassService,
    private cartService:CartService,
  private router: Router,
private authService:AuthService) {}

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

 addToCart(s: Sunglass): void {
   const customerId = localStorage.getItem('customerId');
  const token = this.authService.getToken();
  console.log('Token:', token);

  if (!token || token === 'null' || token === 'undefined') {
    alert('Please login to continue');
    this.router.navigate(['/login']);
    return;
  }
 
   const cartItem = {
     customerId: Number(customerId),
     productId: s.sunGlassId,
     quantity: 1
   };
 
   this.cartService.addToCart(cartItem).subscribe({
     next: (response) => {
       alert('Item successfully added to cart!');
     },
     error: (err) => {
       console.error('Failed to add item to cart:', err);
 
       // 👇 Custom message if backend sends stock issue
       if (err.error?.message?.toLowerCase().includes('stock')) {
         alert('❌ Stock not available for this item.');
       } else {
         alert('Out of Stock');
       }
     }
   });
 }
}
