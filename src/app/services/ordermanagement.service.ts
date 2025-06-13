// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdermanagementService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface OrderDTO {
//   orderId: number;
//   customerEmail: string;
//   address: string;
//   orderStatus: string;
//   deliveryAgent?: string;
//   totalAmount: number;

//   // add more fields if needed
// }

export interface OrderItemDTO {
  productId: number;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderDTO {
  orderId: number;
  customerId: number;
  address: string;
  orderStatus: string;
  totalAmount: number;
  orderDateTime: Date;
  orderItems: OrderItemDTO[]; // ✅ Add this
}




@Injectable({
  providedIn: 'root'
})
export class OrdermanagementService {
  private baseUrl = 'http://localhost:8088/order';


  constructor(private http: HttpClient) { }

  // Get all orders (Admin)
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Mark an order as paid
  makePayment(orderId: number, amount: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/make-payment/${orderId}`, { amount });
  }

  // Bulk update status
  updateOrderStatusBulk(orderIds: number[], status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-order-status`, {
      orderIds,
      status
    });
  }

  // Delete a pending order
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${orderId}`, { responseType: 'text' });
  }

  // Optional: Get paid orders
  getPaidOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/paid-orders`);
  }


  getOrderById(orderId: number): Observable<OrderDTO> {
    return this.http.get<OrderDTO>(`${this.baseUrl}/${orderId}`);
  }

}


