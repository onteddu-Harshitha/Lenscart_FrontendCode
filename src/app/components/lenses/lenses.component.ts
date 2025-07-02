import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Lenses, LensesService } from 'src/app/services/lenses.service';

@Component({
  selector: 'app-lenses',
  templateUrl: './lenses.component.html',
  styleUrls: ['./lenses.component.css']
})
export class LensesComponent implements OnInit {

  lenses: Lenses[] = [];
  filteredLenses: Lenses[] = [];

  selectedBrand = '';
  selectedColor = '';
  selectedPriceRange = '';

  brands: string[] = [];
  colors: string[] = [];

  constructor(private lensesService: LensesService, private cartService: CartService, private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.lensesService.getAllLenses().subscribe(data => {
      this.lenses = data;
      this.filteredLenses = [...this.lenses];
      this.brands = [...new Set(this.lenses.map(l => l.brand))];
      this.colors = [...new Set(this.lenses.map(l => l.colour))];
    });
  }

  applyFilters(): void {
    this.filteredLenses = this.lenses.filter(lens => {
      const matchBrand = this.selectedBrand ? lens.brand === this.selectedBrand : true;
      const matchColor = this.selectedColor ? lens.colour === this.selectedColor : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? lens.price < 1000 :
          this.selectedPriceRange === '1000to2000' ? lens.price >= 1000 && lens.price <= 2000 :
            this.selectedPriceRange === 'above2000' ? lens.price > 2000 : true;

      return matchBrand && matchColor && matchPrice;
    });
  }

  // addToCart(lens: Lenses): void {
  //   console.log('Add to cart:', lens);
  //   // Cart logic here later
  // }

  addToCart(lens: Lenses): void {
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
       productId: lens.lensId,
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
