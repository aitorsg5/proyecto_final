import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin: boolean = false;

  constructor(private router: Router) {}

  login(usuario: any): void {
    this.isAdmin = usuario.es_admin;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  logout(): void {
    this.isAdmin = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  isUserAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser && currentUser.es_admin;
  }
}
