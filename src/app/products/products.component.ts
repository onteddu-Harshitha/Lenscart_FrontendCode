// src/app/components/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedType: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {

        this.products = data;
        console.log(this.products)
        this.filteredProducts = [...this.products];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

 addToCart(product:any): void {
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
     productId: product.id,
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

  extractTypeFromId(id: string): string {
    return id.split('-')[0]; // Example: frame-101 => frame
  }

  get uniqueTypes(): string[] {
    const types = this.products.map(p => this.extractTypeFromId(p.id));
    return Array.from(new Set(types));
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const type = this.extractTypeFromId(product.id);
      return this.selectedType ? type === this.selectedType : true;
    });
  }

  clearFilters(): void {
    this.selectedType = '';
    this.filteredProducts = [...this.products];
  }
}
