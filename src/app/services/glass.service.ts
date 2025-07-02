import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Glass {
  glassId: string;
  brand: string;
  glassImage: string;
  glassName: string;
  powerRange: number;
  type: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class GlassService {

  private baseUrl = 'http://localhost:8084'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getAllGlasses(): Observable<Glass[]> {
    return this.http.get<Glass[]>(`${this.baseUrl}/all-glasses`);
  }
  addGlass(glasses: Glass): Observable<Glass> {
    return this.http.post<Glass>( `${this.baseUrl}/add-glasses`, glasses);
  }

  updateGlass(glasses: Glass): Observable<Glass> {
    return this.http.put<Glass>(`${this.baseUrl}${glasses.glassId}`, glasses);
  }

  deleteGlass(glassId: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${glassId}`);
}



}
