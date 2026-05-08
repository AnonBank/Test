import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page5Service {
  apiUrl = 'https://localhost:44313/api/queue';

  constructor(private http: HttpClient) {}

  getNext() {
    return this.http.get(`${this.apiUrl}/next`);
  }

  reset() {
    return this.http.get(`${this.apiUrl}/check-queue`);
  }
}
