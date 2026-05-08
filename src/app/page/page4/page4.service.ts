import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page4Service {
  apiUrl = 'https://localhost:44313/api/profile';

  constructor(private http: HttpClient) {}

  save(data: any) {
    return this.http.post(`${this.apiUrl}/save`, data);
  }
}
