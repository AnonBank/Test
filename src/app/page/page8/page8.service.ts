import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Page8Service {
  apiUrl = 'https://localhost:44313/api/question';

  constructor(private http: HttpClient) {}

  getQuestions(data: any) {
    return this.http.post(`${this.apiUrl}/list`, data);
  }

  addQuestion(data: any) {
    return this.http.post(`${this.apiUrl}/save`, data);
  }
  
  deleteQuestion(data: any) {
    return this.http.post(`${this.apiUrl}/delete`, data);
  }
}
