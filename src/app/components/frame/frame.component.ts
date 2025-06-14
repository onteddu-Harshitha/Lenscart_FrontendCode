import { Component, OnInit } from '@angular/core';
import { Frame, FrameService } from 'src/app/services/frame.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frames',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FramesComponent implements OnInit {

  frames: Frame[] = [];
  filteredFrames: Frame[] = [];

  selectedBrand = '';
  selectedColor = '';
  selectedPriceRange = '';

  brands: string[] = [];
  colors: string[] = [];

  constructor(
    private frameService: FrameService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.frameService.getAllFrames().subscribe(data => {
      this.frames = data;
      this.filteredFrames = [...this.frames];

      // Extract unique brands and colors
      this.brands = [...new Set(this.frames.map(f => f.brand))];
      this.colors = [...new Set(this.frames.map(f => f.color))];
    });
  }

  applyFilters(): void {
    this.filteredFrames = this.frames.filter(frame => {
      const matchBrand = this.selectedBrand ? frame.brand === this.selectedBrand : true;
      const matchColor = this.selectedColor ? frame.color === this.selectedColor : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? frame.price < 1000 :
          this.selectedPriceRange === '1000to2000' ? frame.price >= 1000 && frame.price <= 2000 :
            this.selectedPriceRange === 'above2000' ? frame.price > 2000 : true;

      return matchBrand && matchColor && matchPrice;
    });
  }

  // addToCart(frame: Frame): void {
  //   if (!this.authService.isLoggedIn()) {
  //     alert('Please login to continue');
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   // Get the logged-in user's ID
  //   const customerId = this.authService.getLoggedInUserId();
  //   if (!customerId) {
  //     alert('Customer ID not found.');
  //     return;
  //   }

  //   const cartItem = {
  //     customerId: customerId,
  //     productId: frame.frameId,
  //     quantity: 1,  // Adjust quantity as needed
  //   };

  //   // Add to cart
  //   this.cartService.addToCart(cartItem).subscribe({
  //     next: (response) => {
  //       console.log('Item added to cart:', response);
  //       alert('Item successfully added to cart!');
  //     },
  //     error: (err) => {
  //       console.error('Failed to add item to cart:', err);
  //       if (err.error && err.error.message) {
  //         alert(`Error: ${err.error.message}`);
  //       } else {
  //         alert('An unexpected error occurred while adding the item to the cart.');
  //       }
  //     },
  //   });
  // }
  addToCart(frame: Frame): void {
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      alert('Please login to continue');
      this.router.navigate(['/login']);
      return;
    }

    const cartItem = {
      customerId: Number(customerId),
      productId: frame.frameId,
      quantity: 1,

    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        alert('Item successfully added to cart!');
        this.cartService.getCart(Number(customerId)).subscribe({
          next: (cart) => {
            // Store the updated cart to display in the UI
            console.log('Updated Cart:', cart);
            // Store or use the updated cart data as needed
            // e.g., this.cart = cart; (if you want to store it locally)
          },
          error: (err) => {
            console.error('Error fetching updated cart:', err);
            alert('Failed to fetch updated cart');
          }
        });
      },



      error: (err) => {
        console.error('Failed to add item to cart:', err);
        alert('Error adding item to cart');
      }
    });
  }

}
