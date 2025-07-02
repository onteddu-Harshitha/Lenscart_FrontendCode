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
    return this.http.delete(`${this.apiUrl}/${customerId}/clear`, { headers });
  }}
