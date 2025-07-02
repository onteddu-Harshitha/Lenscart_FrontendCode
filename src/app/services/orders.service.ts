

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// // Define the structure of an Order as per the backend response (OrderDTO)
// export interface Order {
//   orderId: number;        // Assuming this is the unique identifier for each order
//   customerEmail: string;   // Customer name associated with the order
//   totalAmount: number;    // Total amount for the order
//   orderDateTime: string;      // Date the order was placed
//   orderStatus: string;
//   address:string;         // Order status (Paid, Pending, etc.)
// }


// @Injectable({
//   providedIn: 'root'
// })

// export class OrdersService {
//   // Change the base URL to the correct one for the order service
//   //private baseUrl = 'http://localhost:8085/api/customer';

//   // URL for delete API on port 9004
//   private BaseUrl = 'http://localhost:8088/order';

//   constructor(private http: HttpClient) { }

//   private getHeaders() {
//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${localStorage.getItem('token') || ''}`
//       })
//     };
//   }

//   // Fetch cart details (example method)
//   getCartDetails(): Observable<any> {
//     return this.http.get(`${this.BaseUrl}/cart`, this.getHeaders());
//   }

//   // Place order with address
//   placeOrder(address: string): Observable<any> {
//     const encodedAddress = encodeURIComponent(address);
//     const url = `${this.BaseUrl}/place?address=${encodedAddress}`;
//     return this.http.post(url, {}, this.getHeaders());
//   }

//   // Make payment (PUT request)
//   makePayment(orderId: number, paymentRequest: any): Observable<any> {
//     const url = `${this.BaseUrl}/make-payment/${orderId}`;
//     return this.http.put(url, paymentRequest, this.getHeaders());
//   }

//   // Method to get order history
//   getOrders(): Observable<any> {
//     return this.http.get(`${this.BaseUrl}/orders`, this.getHeaders());
//   }

//   // Delete a pending order by orderId
//   deletePendingOrder(orderId: number): Observable<any> {
//     const url = `${this.BaseUrl}/delete/${orderId}`;  // Full URL for delete API
//     return this.http.delete(url, this.getHeaders());  // Use DELETE method
//   }

//   getPaidOrders(): Observable<Order[]> {
//     const url = `${this.BaseUrl}/paid-orders`;
//     return this.http.get<Order[]>(url, this.getHeaders());
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId: number;
  customerEmail: string;
  totalAmount: number;
  orderDateTime: string;
  orderStatus: string;
  address: string;
}



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private BaseUrl = 'http://localhost:8088/order';
  private baseUrl = 'http://localhost:8085/cart';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
  }

  placeOrder(customerId: number, address: string): Observable<any> {
    const encodedAddress = encodeURIComponent(address);
    const url = `${this.BaseUrl}/place/${customerId}?address=${encodedAddress}`;
    return this.http.post(url, {}, this.getHeaders());
  }



  makePayment(orderId: number, paymentRequest: any): Observable<any> {
    const url = `${this.BaseUrl}/make-payment/${orderId}`;
    return this.http.put(url, paymentRequest, this.getHeaders());
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/all`, this.getHeaders());
  }
getCustomerOrders(customerId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.BaseUrl}/customer?customerId=${customerId}`, this.getHeaders());
}
  deletePendingOrder(orderId: number): Observable<any> {
    const url = `${this.BaseUrl}/delete/${orderId}`;
    return this.http.delete(url, this.getHeaders());
  }

  getPaidOrders(): Observable<Order[]> {
    const url = `${this.BaseUrl}/paid-orders`;
    return this.http.get<Order[]>(url, this.getHeaders());
  }

  clearCart(customerId: number): Observable<any> {
    //const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${customerId}/clear`, this.getHeaders());
  }
  cancelOrder(orderId: number): Observable<any> {
  return this.http.put(
    `${this.BaseUrl}/cancel/${orderId}`,
    {},
    this.getHeaders()
  );
}

}
