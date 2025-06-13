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

  addToCart(product: any): void {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in to add items to cart.');
      this.router.navigate(['/login']);
      return;
    }

    const customerId = this.authService.getLoggedInUserId(); // Get the logged-in user ID
    const cartItem = {
      customerId: customerId,
      productId: product.id,
      quantity: 1 // Or get this value from user input
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        alert('Item added to cart!');
        this.router.navigate(['/cart']); // Redirect to cart page after successful addition
      },
      error: (error) => {
        console.error('Failed to add item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
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
