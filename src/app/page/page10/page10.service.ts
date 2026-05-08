import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page10Service {
  apiUrl = 'https://localhost:44313/api/question-result';

  constructor(private http: HttpClient) {}

  getQuestions(data: any) {
    return this.http.post(`${this.apiUrl}/list`, data);
  }

  save(data: any) {
    return this.http.post(`${this.apiUrl}/save`, data);
  }

}
