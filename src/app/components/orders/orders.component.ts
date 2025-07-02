// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-orders',
// //   templateUrl: './orders.component.html',
// //   styleUrls: ['./orders.component.css']
// // })
// // export class OrdersComponent {

// // }
// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class OrdersService {

// //   constructor() { }
// // }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from 'src/app/services/cart.service';
// import { OrdersService } from 'src/app/services/orders.service';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
// })
// export class OrdersComponent implements OnInit {
//   currentStep: number = 1;

//   // Address
//   address: string = '';

//   // Cart & Order
//   cartItems: any[] = [];
//   totalAmount: number = 0;
//   orderId: number = -1;

//   // Payment
//   paymentAmount: number = 0;
//   paymentSuccess: boolean = false;
//   paymentError: string = '';
//   placingOrder: boolean = false;

//   // Errors
//   errorMessage: string = '';

//   // Customer
//   customerId: number = 0;

//   constructor(
//     private orderService: OrdersService,
//     private cartService: CartService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.customerId = Number(localStorage.getItem('customerId'));
//     if (!this.customerId) {
//       this.errorMessage = 'Customer ID not found. Please log in again.';
//       return;
//     }
//     this.getCartDetails(this.customerId);
//   }

//   getCartDetails(customerId: number): void {
//     this.cartService.getCart(customerId).subscribe({
//       next: (res) => {
//         this.cartItems = res.cartItems || [];
//         this.totalAmount = this.cartItems.reduce((sum, item) => {
//           const pricePerItem = item.discountedPrice ?? item.price;
//           return sum + (pricePerItem * item.quantity);
//         }, 0);
//         this.paymentAmount = this.totalAmount;
//       },
//       error: () => {
//         this.errorMessage = 'Failed to fetch cart details.';
//       }
//     });
//   }

//   goToNextStep(): void {
//     if (this.currentStep === 1) {
//       const selectedAddress = this.address.trim();

//       if (!selectedAddress) {
//         this.errorMessage = 'Please enter a valid address.';
//         return;
//       }

//       if (this.orderId !== -1 && !this.paymentSuccess) {
//         this.orderService.deletePendingOrder(this.orderId).subscribe({
//           next: () => {
//             this.orderId = -1;
//             this.placeOrder(selectedAddress);
//           },
//           error: (err) => {
//             console.error('Failed to delete pending order:', err);
//             this.placeOrder(selectedAddress);
//           }
//         });
//       } else {
//         this.placeOrder(selectedAddress);
//       }

//     } else if (this.currentStep === 2) {
//       this.initiatePayment();
//     }
//   }

//   goToPreviousStep(): void {
//     if (this.currentStep > 1) {
//       if (this.orderId !== -1 && !this.paymentSuccess) {
//         this.deletePendingOrder();
//       }
//       this.currentStep--;
//     }
//   }

//   // placeOrder(selectedAddress: string): void {
//   //   this.placingOrder = true;
//   //   this.errorMessage = '';

//   //   this.orderService.placeOrder(selectedAddress).subscribe({
//   //     next: (response) => {
//   //       this.orderId = response.orderId;
//   //       if (response.totalAmount) {
//   //         this.totalAmount = response.totalAmount;
//   //         this.paymentAmount = response.totalAmount;
//   //       }
//   //       this.placingOrder = false;
//   //       this.currentStep = 2;
//   //     },
//   //     error: () => {
//   //       this.errorMessage = 'Failed to place order. Please try again later.';
//   //       this.placingOrder = false;
//   //     }
//   //   });
//   // }

//   placeOrder() {
//     if (this.customerId && this.address) {
//       this.orderService.placeOrder(this.customerId, this.address).subscribe({
//         next: res => console.log('Order placed successfully', res),
//         error: err => console.error('Error placing order', err)
//       });
//     } else {
//       console.error('Missing customerId or address');
//     }
//   }

//   initiatePayment(): void {
//     this.paymentError = '';

//     if (this.paymentAmount <= 0) {
//       this.paymentError = 'Amount must be greater than 0.';
//       return;
//     }

//     const roundedEntered = Math.round(this.paymentAmount * 100) / 100;
//     const roundedTotal = Math.round(this.totalAmount * 100) / 100;

//     if (roundedEntered !== roundedTotal) {
//       this.paymentError = `Amount must match the total: ₹${this.totalAmount}`;
//       return;
//     }

//     const paymentRequest = { amount: roundedEntered };

//     this.orderService.makePayment(this.orderId, paymentRequest).subscribe({
//       next: () => {
//         this.paymentSuccess = true;
//         this.paymentError = '';

//         this.cartService.clearCart(this.customerId).subscribe({
//           next: () => console.log('Cart cleared after payment.'),
//           error: (err) => console.error('Failed to clear cart:', err)
//         });

//         this.currentStep = 3;
//       },
//       error: (err) => {
//         this.paymentError = 'Payment failed. Please try again.';
//         console.error('Payment Error:', err);
//       }
//     });
//   }

//   deletePendingOrder(): void {
//     if (this.orderId !== -1) {
//       this.orderService.deletePendingOrder(this.orderId).subscribe({
//         next: () => {
//           this.orderId = -1;
//           this.totalAmount = 0;
//           this.paymentAmount = 0;
//         },
//         error: (err) => {
//           console.error('Failed to delete pending order:', err);
//         }
//       });
//     }
//   }

//   finishOrder(): void {
//     this.router.navigate(['/']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentStep: number = 1;

  // Address
  address: string = '';

  // Cart & Order
  cartItems: any[] = [];
  totalAmount: number = 0;
  orderId: number = -1;

  // Payment
  paymentAmount: number = 0;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  placingOrder: boolean = false;

  // Errors
  errorMessage: string = '';

  // Customer
  customerId: number = 0;

  constructor(
    private orderService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    if (!this.customerId) {
      this.errorMessage = 'Customer ID not found. Please log in again.';
      return;
    }
    this.getCartDetails(this.customerId);
  }

  getCartDetails(customerId: number): void {
    this.cartService.getCart(customerId).subscribe({
      next: (res) => {
        
        this.cartItems = res.cartItems || [];
        console.log(this.cartItems);
        this.totalAmount = this.cartItems.reduce((sum, item) => {
          const pricePerItem = item.discountedPrice ?? item.price;
          return sum + (pricePerItem * item.quantity);
        }, 0);
        this.paymentAmount = this.totalAmount;
      },
      error: () => {
        this.errorMessage = 'Failed to fetch cart details.';
      }
    });
  }

  goToNextStep(): void {
    if (this.currentStep === 1) {
      const selectedAddress = this.address.trim();

      if (!selectedAddress) {
        this.errorMessage = 'Please enter a valid address.';
        return;
      }

      if (this.orderId !== -1 && !this.paymentSuccess) {
        this.orderService.deletePendingOrder(this.orderId).subscribe({
          next: () => {
            this.orderId = -1;
            this.placeOrder(selectedAddress);
          },
          error: (err) => {
            console.error('Failed to delete pending order:', err);
            this.placeOrder(selectedAddress);
          }
        });
      } else {
        this.placeOrder(selectedAddress);
      }

    } else if (this.currentStep === 2) {
      this.initiatePayment();
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
        if (this.orderId !== -1 && !this.paymentSuccess) {
            this.deletePendingOrder();
            // Display payment incomplete message
            alert('Payment incomplete. Returning to cart.');
            // Navigate to the cart page
            this.router.navigate(['/cart']);
        } else {
            this.currentStep--;
        }
    }
}


  placeOrder(selectedAddress: string): void {
    this.placingOrder = true;
    this.errorMessage = '';
 
    this.orderService.placeOrder(this.customerId, selectedAddress).subscribe({
      next: (response) => {
        this.orderId = response.orderId;
        if (response.totalAmount) {
          this.totalAmount = response.totalAmount;
          this.paymentAmount = response.totalAmount;
        }
        this.placingOrder = false;
        this.currentStep = 2;
      },
      error: (error) => {
        if(error.status===400&&error.error?.message){
          this.errorMessage=error.error.message;
        }else{
          this.errorMessage = 'Failed to place order. Please try again later.';
        }
       
       
      }
    });
  }

  initiatePayment(): void {
    this.paymentError = '';

    if (this.paymentAmount <= 0) {
      this.paymentError = 'Amount must be greater than 0.';
      return;
    }

    const roundedEntered = Math.round(this.paymentAmount * 100) / 100;
    const roundedTotal = Math.round(this.totalAmount * 100) / 100;

    if (roundedEntered !== roundedTotal) {
      this.paymentError = `Amount must match the total: ₹${this.totalAmount}`;
      return;
    }

    const paymentRequest = { amount: roundedEntered };

    this.orderService.makePayment(this.orderId, paymentRequest).subscribe({
      next: () => {
        this.paymentSuccess = true;
        this.paymentError = '';

        this.cartService.clearCart(this.customerId).subscribe({
          next: () => console.log('Cart cleared after payment.'),
          error: (err) => console.error('Failed to clear cart:', err)
        });

        this.currentStep = 3;
      },
      error: (err) => {
        this.paymentError = 'Payment failed. Please try again.';
        console.error('Payment Error:', err);
      }
    });
  }

  deletePendingOrder(): void {
    if (this.orderId !== -1) {
      this.orderService.deletePendingOrder(this.orderId).subscribe({
        next: () => {
          this.orderId = -1;
          this.totalAmount = 0;
          this.paymentAmount = 0;
        },
        error: (err) => {
          console.error('Failed to delete pending order:', err);
        }
      });
    }
  }

  finishOrder(): void {
    this.router.navigate(['/']);
  }
}

