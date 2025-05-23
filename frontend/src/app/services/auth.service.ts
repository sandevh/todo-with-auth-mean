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
    // if (!email.trim() || !password.trim() || !userName.trim()) {
    //   return;
    // }
    return this.http.post(`${this.baseUrl}/signup`, {email, password, userName});
  }

  login(email: string, password: string) {
    // if (!email.trim() || !password.trim()) {
    //   return;
    // }
    return this.http.post<any>(`${this.baseUrl}/login`, {email, password});
  }

  getUserName() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userName;
    }
    return null;
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
