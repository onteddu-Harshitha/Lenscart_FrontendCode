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

  toastVisible = false;
  toastMessage = '';

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
  //   const customerId = localStorage.getItem('customerId');

  //   if (!customerId) {
  //     this.router.navigate(['/login']);
  //     this.showToast('Please login to continue');
  //     return;
  //   }

  //   const cartItem = {
  //     customerId: Number(customerId),
  //     productId: frame.frameId,
  //     quantity: 1,
  //   };

  //   this.cartService.addToCart(cartItem).subscribe({
  //     next: () => {
  //       this.showToast('Item successfully added to cart!');
  //       this.cartService.getCart(Number(customerId)).subscribe({
  //         next: (cart) => {
  //           console.log('Updated Cart:', cart);
  //         },
  //         error: (err) => {
  //           console.error('Error fetching updated cart:', err);
  //           this.showToast('Failed to fetch updated cart');
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Failed to add item to cart:', err);
  //       this.showToast('Error adding item to cart');
  //     }
  //   });
  // }
  //   addToCart(frame: Frame): void {
  //   const customerId = localStorage.getItem('customerId');

  //   if (!customerId) {
  //     this.router.navigate(['/login']);
  //     this.showToast('Please login to continue');
  //     return;
  //   }

  //   const cartItem = {
  //     customerId: Number(customerId),
  //     productId: frame.frameId,
  //     quantity: 1,
  //   };

  //   this.cartService.addToCart(cartItem).subscribe({
  //     next: () => {
  //       this.showToast('Item successfully added to cart!');
  //       this.cartService.getCart(Number(customerId)).subscribe({
  //         next: (cart) => {
  //           console.log('Updated Cart:', cart);
  //         },
  //         error: (err) => {
  //           console.error('Error fetching updated cart:', err);
  //           this.showToast('Failed to fetch updated cart');
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Failed to add item to cart:', err);

  //       if (err.error?.includes('Out of stock') || err.error?.includes('Insufficient stock')) {
  //         this.showToast('Stock not available');
  //       } else if (err.error?.includes('already in cart')) {
  //         this.showToast('Item already in cart');
  //       } else {
  //         this.showToast('Error adding item to cart');
  //       }
  //     }
  //   });
  // }
  addToCart(frame: Frame): void {
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
      productId: frame.frameId,
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
