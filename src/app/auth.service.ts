import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getToken(formData: any) {
    return this.httpClient.post(`${environment.apiUrl}/token`, formData);
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getUserInfo() {
    return this.httpClient.get(`${environment.apiUrl}/me`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    });
  }

  getRole() {
    return this.getUserInfo().subscribe((data: any) => {
      if (data.role_id === 1) {
        localStorage.setItem('role', 'admin');
      }
    });
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.getRole();
    setTimeout(() => {
      this.router.navigate(['/dashboard']).then();
    }, 1000);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    this.router.navigate(['/login']).then();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !this.tokenExpired(localStorage.getItem('token')!);
  }
}
