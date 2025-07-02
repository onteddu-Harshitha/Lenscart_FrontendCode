import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

export interface OrderItem {
  productName: string;
  imagePath: string;
  discountedPrice: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  orderDateTime: string;
  orderStatus: string;
  totalAmount: number;
  items: OrderItem[];
}

@Component({
  selector: 'app-order-history',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const customerId = Number(localStorage.getItem('customerId'));
    if (!customerId) {
      this.errorMessage = 'Customer not logged in.';
      return;
    }

    this.isLoading = true;
    this.orderService.getCustomerOrders(customerId).subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load your orders.';
        this.isLoading = false;
      }
    });
  }

  cancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(Number(orderId)).subscribe({
        next: () => {
          alert('Order cancelled successfully.');
          this.loadOrders(); // Refresh the list
        },
        error: () => {
          alert('Order cancelled. Your amount will be refunded in 7 working days');
        }
      });
    }
  }
}
