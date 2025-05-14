import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth'

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string, userName: string) {
    return this.http.post(`${this.baseUrl}/signup`, {email, password, userName});
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${this.baseUrl}/login`, {email, password});
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
