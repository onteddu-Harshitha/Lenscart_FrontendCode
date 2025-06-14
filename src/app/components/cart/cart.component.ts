
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = {};
  customerId: number | null = null;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    const idFromStorage = localStorage.getItem("customerId");
    this.customerId = idFromStorage ? Number(idFromStorage) : null;

    if (!this.customerId) {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Add this log here
    console.log('Fetching cart for customerId:', this.customerId);


    this.cartService.getCart(this.customerId).subscribe(
      (data) => {
        console.log('Cart data received:', data);

        if (!data || !data.cartItems || data.cartItems.length === 0) {
          this.cart = { products: [], totalAmount: 0 };
          return;
        }

        const products = data.cartItems.map((item: any) => ({
          productName: item.productId,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        }));

        this.cart = {
          products,
          totalAmount: data.totalAmount || 0,
        };
      },
      (error) => {
        console.error('Error fetching cart data', error);
        this.cart = { products: [], totalAmount: 0 };
      }
    );

  }

  removeFromCart(productId: string): void {
    if (!this.customerId) return;

    this.cartService.removeProduct(this.customerId, productId).subscribe(
      (response) => {
        console.log('Product removed:', response);

        if (!response || !response.cartItems || response.cartItems.length === 0) {
          this.cart = { products: [], totalAmount: 0 };
          return;
        }

        const products = response.cartItems.map((item: any) => ({
          productName: item.productId,
          price: item.price,
          quantity: item.quantity,
        }));

        this.cart = {
          products,
          totalAmount: response.totalAmount || 0,
        };
      },
      (error) => {
        console.error('Error removing product:', error);
      }
    );
  }

  changeQuantity(productId: string, newQuantity: number): void {
    if (!this.customerId || newQuantity < 1) return;

    this.cartService.updateQuantity(this.customerId, productId, newQuantity).subscribe(
      (updatedCart) => {
        const products = updatedCart.cartItems.map((item: any) => ({
          productName: item.productId,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        }));

        this.cart = {
          products,
          totalAmount: updatedCart.totalAmount || 0,
        };
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );
  }
  proceedToCheckout(): void {
    this.router.navigate(['/orders']);
  }
}
