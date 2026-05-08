import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Page1Service {
  private apiUrl = 'https://localhost:44313/api/user';

  constructor(private http: HttpClient) {}

  saveUser(data: any) {
    return this.http.post(`${this.apiUrl}/save`, data);
  }

  list(data: any) {
    return this.http.post(`${this.apiUrl}/list`, data);
  }
}
