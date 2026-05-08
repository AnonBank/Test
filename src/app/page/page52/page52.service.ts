import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page52Service {
  apiUrl = 'https://localhost:44313/api/queue';

  constructor(private http: HttpClient) {}
  reset() {
    return this.http.get(`${this.apiUrl}/reset`);
  }
}
