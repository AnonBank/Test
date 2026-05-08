import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Page7Service {
  private apiUrl = 'https://localhost:44313/api/productqr';

  constructor(private http: HttpClient) {}

  save(data: any) {
    return this.http.post(`${this.apiUrl}/save`, data);
  }

  list(data: any) {
    return this.http.post(`${this.apiUrl}/list`, data);
  }

  delete(data: any) {
    return this.http.post(`${this.apiUrl}/delete`, data);
  }
}
