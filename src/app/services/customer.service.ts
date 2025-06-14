import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Customer {
  id: number;
  name: string;
  email: string;
  phonenumber: string;

}


@Injectable({
  providedIn: 'root'
})

export class CustomerService {


  private baseUrl = 'http://localhost:8085/api/auth'; // Backend base URL
  constructor(private http: HttpClient) { }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

}
