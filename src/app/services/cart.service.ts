// // src/app/services/cart.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// export interface CartItem {
//   productId: string;
//   quantity: number;
//   price: number;
// }

// export interface CartResponseDTO {
//   cartId: number;
//   customerId: number;
//   cartItems: CartItem[];
//   totalAmount: number;
// }


// @Injectable({
//   providedIn: 'root'
// })



// export class CartService {
//   private baseUrl = 'http://localhost:8085/api/customers/cart'; // Update with your backend URL
//   private apiUrl = 'http://localhost:8807'; // Update with your backend URL

//   constructor(private http: HttpClient, private authService: AuthService) { }

//   addToCart(cartItem: any): Observable<any> {
//     const token = this.authService.getToken(); // Get the token from AuthService
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//     return this.http.post(`${this.baseUrl}/add`, cartItem, { headers });
//   }
//   // Get cart details for a specific customer
//   getCart(customerId: number): Observable<any> {
//     const token = this.authService.getToken();  // Get the token from localStorage
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.baseUrl}/${customerId}`, { headers });
//   }

//   removeProduct(customerId: number, productId: string): Observable<any> {
//     return this.http.delete<CartResponseDTO>(`/cart/${customerId}/remove/${productId}`);
//   }




// }

// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface CartItemRequest {
  productId: string;
  quantity: number;

}

export interface CartItem {
  productId: string;
  price: number;
  quantity: number;
  imageUrl: string;


}

export interface CartResponseDTO {
  cartId: number;
  customerId: number;
  cartItems: CartItem[];
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8085/api/customers/cart';
  private apiUrl = 'http://localhost:8087/cart';


  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addToCart(cartItem: CartItemRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/add`, cartItem, { headers });
  }

  getCart(customerId: number): Observable<CartResponseDTO> {
    const headers = this.getAuthHeaders();
    return this.http.get<CartResponseDTO>(`${this.baseUrl}/${customerId}`, { headers });
  }

  removeProduct(customerId: number, productId: string): Observable<CartResponseDTO> {
    const headers = this.getAuthHeaders();
    return this.http.delete<CartResponseDTO>(`${this.apiUrl}/${customerId}/remove/${productId}`, { headers });
  }

  // updateQuantity(customerId: number, productId: string, quantity: number): Observable<CartResponseDTO> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.put<CartResponseDTO>(
  //     `${this.apiUrl}/${customerId}/update/${productId}/${quantity}`,
  //     { headers }
  //   );
  // }
  updateQuantity(customerId: number, productId: string, quantity: number): Observable<CartResponseDTO> {
    const headers = this.getAuthHeaders();
    return this.http.put<CartResponseDTO>(
      `${this.apiUrl}/${customerId}/update/${productId}/${quantity}`,
      {}, // empty body since quantity is in the URL
      { headers }
    );
  }


  clearCart(customerId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${customerId}/clear`, { headers });
  }
}

