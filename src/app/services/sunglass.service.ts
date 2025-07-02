import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sunglass {
  sunGlassId: string;
  sunGlassName: string;
  brand: string;
  price: number;
  frameColor: string;
  frameShape: string;
  glassColor: string;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SunglassService {
  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  getAllSunglasses(): Observable<Sunglass[]> {
    return this.http.get<Sunglass[]>(`${this.baseUrl}/all`);
  }
  addSunglass(sunglasse: Sunglass): Observable<Sunglass> {
      return this.http.post<Sunglass>(`${this.baseUrl}/add-sunGlass`, sunglasse);
    }
  
    updateSunglass(sunglasse: Sunglass): Observable<Sunglass> {
      return this.http.put<Sunglass>(`${this.baseUrl}/update-sunGlass/${sunglasse.sunGlassId}`, sunglasse);
    }
  
    deleteSunglass(sunGlassId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${sunGlassId}`);
    }



}
