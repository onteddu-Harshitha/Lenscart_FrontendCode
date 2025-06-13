import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lenses {
  lensId: string;
  brand: string;
  lensImage: string;
  shape: string;
  colour: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class LensesService {

  private baseUrl = 'http://localhost:8082'; // Replace with actual lenses backend URL

  constructor(private http: HttpClient) { }

  getAllLenses(): Observable<Lenses[]> {
    return this.http.get<Lenses[]>(`${this.baseUrl}/get-all`);
  }
  addLens(lens: Lenses): Observable<Lenses> {
    return this.http.post<Lenses>(`${this.baseUrl}/add-lense`, lens);
  }

  updateLens(lens: Lenses): Observable<Lenses> {
    return this.http.put<Lenses>(`${this.baseUrl}/update-lenses/${lens.lensId}`, lens);
  }

  deleteLens(lensId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${lensId}`);
  }


}
