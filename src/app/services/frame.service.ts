import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Frame {
  frameId: string;
  frameName: string;
  brand: string;
  color: string;
  price: number;
 
  shape: string;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  private baseUrl = 'http://localhost:8083'; // Change port if needed

  constructor(private http: HttpClient) {}

  getAllFrames(): Observable<Frame[]> {
    return this.http.get<Frame[]>(`${this.baseUrl}/allframes`);
  }
  addFrames(frames: Frame): Observable<Frame> {
      return this.http.post<Frame>(`${this.baseUrl}/add-frame`, frames);
    }
  
    updateFrames(frames: Frame): Observable<Frame> {
      return this.http.put<Frame>(`${this.baseUrl}/update-frame/${frames.frameId}`, frames);
    }
  
    deleteFrames(frameId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${frameId}`);
    }
  
}
