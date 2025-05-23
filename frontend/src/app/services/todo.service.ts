import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

type Todo = { _id: string; task: string; done?: boolean };

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
    const token = localStorage.getItem('token');
    return this.http.get<Todo[]>(`${this.baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addTodo(task: string) {
    return this.http.post(`${this.baseUrl}`, { task }, this.getHeaders());
  }

  updateTodo(id: string, data: Partial<Todo>) {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.baseUrl}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}
