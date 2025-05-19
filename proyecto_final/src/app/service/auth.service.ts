import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/post'; // URL del backend para autenticación

  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend para iniciar sesión.
   * @param usuario - Email y password del usuario
   * @returns - Observable con la respuesta del backend
   */
  login(usuario: { email: string; password: string }): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  /**
   * Guarda el usuario autenticado en localStorage
   */
  setUsuarioAutenticado(usuario: Usuario): void {
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  /**
   * Obtiene el usuario autenticado desde localStorage
   */
  getUsuarioAutenticado(): Usuario | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Cierra sesión y redirige al login
   */
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
