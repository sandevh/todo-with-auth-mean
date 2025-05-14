import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:5000/api/todo';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
  }

  getTodos() {
    return this.http.get(this.baseUrl, this.getHeaders());
  }

  addTodo(task: string) {
    return this.http.post(this.baseUrl, {task}, this.getHeaders());
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeaders())
  }
}
