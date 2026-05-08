import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page9Service {
  apiUrl = 'https://localhost:44313/api/text';

  constructor(private http: HttpClient) {}

  get(data: any) {
    return this.http.post(`${this.apiUrl}/get`, data);
  }
}
