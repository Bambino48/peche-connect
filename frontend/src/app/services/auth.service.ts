import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /** 🔐 Inscription */
  register(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload);
  }

  /** 🔐 Connexion */
  login(payload: { phone: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, payload);
  }

  /** 💾 Token */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
