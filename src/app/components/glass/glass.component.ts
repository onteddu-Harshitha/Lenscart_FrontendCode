import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Glass, GlassService } from 'src/app/services/glass.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glass.component.html',
  styleUrls: ['./glass.component.css']
})
export class GlassComponent implements OnInit {

  glasses: Glass[] = [];
  filteredGlasses: Glass[] = [];

  selectedBrand = '';
  selectedType = '';
  selectedPriceRange = '';

  brands: string[] = [];
  types: string[] = [];

  constructor(private glassService: GlassService, private cartService: CartService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.glassService.getAllGlasses().subscribe(data => {
      this.glasses = data;
      this.filteredGlasses = [...this.glasses];

      this.brands = [...new Set(this.glasses.map(g => g.brand))];
      this.types = [...new Set(this.glasses.map(g => g.type))];
    });
  }

  applyFilters(): void {
    this.filteredGlasses = this.glasses.filter(glass => {
      const matchBrand = this.selectedBrand ? glass.brand === this.selectedBrand : true;
      const matchType = this.selectedType ? glass.type === this.selectedType : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? glass.price < 1000 :
          this.selectedPriceRange === '1000to2000' ? glass.price >= 1000 && glass.price <= 2000 :
            this.selectedPriceRange === 'above2000' ? glass.price > 2000 : true;

      return matchBrand && matchType && matchPrice;
    });
  }





  // addToCart(glass: Glass): void {
  //   const idFromStorage = localStorage.getItem("customerId");
  //   const customerId = idFromStorage ? Number(idFromStorage) : null;

  //   if (!customerId) {
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   const cartItem = {
  //     customerId: customerId,
  //     productId: glass.glassId,     // or glass.productId depending on your model
  //     quantity: 1,
  //     price: glass.price
  //   };

  //   console.log('Adding to cart:', cartItem);

  //   this.cartservice.addToCart(cartItem).subscribe(
  //     (response) => {
  //       console.log('Item added to cart successfully:', response);
  //       // Optionally show a success message or update cart UI
  //     },
  //     (error) => {
  //       console.error('Error adding item to cart:', error);
  //       // Optionally show an error message
  //     }
  //   );
  // }

  // addToCart(glass: Glass): void {
  //    const customerId = localStorage.getItem('customerId');

  //    if (!customerId) {
  //      alert('Please login to continue');
  //      this.router.navigate(['/login']);
  //      return;
  //    }

  //    const cartItem = {
  //      customerId: Number(customerId),
  //      productId: glass.glassId,
  //      quantity: 1
  //    };

  //    this.cartService.addToCart(cartItem).subscribe({
  //      next: (response) => {
  //        alert('Item successfully added to cart!');
  //      },
  //      error: (err) => {
  //        console.error('Failed to add item to cart:', err);

  //        // 👇 Custom message if backend sends stock issue
  //        if (err.error?.message?.toLowerCase().includes('stock')) {
  //          alert('❌ Stock not available for this item.');
  //        } else {
  //          alert('❌ Error adding item to cart.');
  //        }
  //      }
  //    });
  //  }
  addToCart(glass: Glass): void {
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
      productId: glass.glassId,
      quantity: 1
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        alert('Item successfully added to cart!');
      },
      error: (err) => {
        console.error('Failed to add item to cart:', err);

        if (err.status === 403) {
          alert('❌ You are not authorized to perform this action. Please login again.');
          this.router.navigate(['/login']);
        } else if (err.error?.message?.toLowerCase().includes('stock')) {
          alert('❌ Stock not available for this item.');
        } else {
          alert('Out of Stock');
        }
      }
    });
  }
}
