import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page3Service {
  apiUrl = 'https://localhost:44313/api/approval';

  constructor(private http: HttpClient) {}

  list(data: any) {
    return this.http.post(`${this.apiUrl}/list`, { params: data });
  }

  approve(data: any) {
    return this.http.post(`${this.apiUrl}/approve`, data);
  }

  reject(data: any) {
    return this.http.post(`${this.apiUrl}/reject`, data);
  }
}
