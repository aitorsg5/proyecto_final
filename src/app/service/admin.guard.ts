import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isUserAdmin()) {
      return true; // Permitir acceso si el usuario es administrador
    } else {
      alert('Acceso denegado. Debes ser administrador para acceder a esta página.'); // Mostrar alerta
      this.router.navigate(['/index']); // Redirigir a la página de inicio
      return false;
    }
  }
}
