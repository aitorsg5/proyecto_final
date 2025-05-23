import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import  listadeusuarios  from '../../../usuarios.json'



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private url = 'http://127.0.0.1:8000/api/users'; // Cambia la URL si es necesario




private isLoggedIn = false; // Iniciaremos la variable en false para indicar que el usuario no esta autenticado en principio


//Declarar un BehaviorSubject para contener un usuario o null;
// BehaviorSubject permite emitir valores y que los suscriptores reciban el último valor emitido.
// o mas claro recoje el ultimo valor que se alla recojido;

private currentUserSubject: BehaviorSubject<Usuario | null>;

// Declara una radio (Observable) que emite los valores guardados en currentUserSubject.
// Esto permite que otras partes de la aplicación puedan "escuchar" los cambios en el usuario actual.
public currentUser: Observable<Usuario | null>;

login(usuario: { email: string; password: string }): Observable<Usuario> {
  return this.http.post<Usuario>('http://127.0.0.1:8000/api/login', usuario);
}

setUsuarioAutenticado(usuario: Usuario): void {
  localStorage.setItem('currentUser', JSON.stringify(usuario));
}

constructor(private http: HttpClient) {
  this.currentUserSubject = new BehaviorSubject<Usuario | null>(null); //Inicia el valor en null;
  this.currentUser = this.currentUserSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}


//metodo login que recibe objeto Usuario como parametro;
//Marca el usuario como  que esta logeado;
// Actualiza el currentUserSubject con el usuario actual, notificando a los suscriptores.


// el metodo lo que hace es cambiar el valor isLoggedIn a null
// Actualiza el currentUserSubject  a null
logout() {
  this.isLoggedIn = false;
  this.currentUserSubject.next(null);
}
// Método isAuthenticated que devuelve un booleano.
isAuthenticated(): boolean {
  // Devuelve true si el usuario está autenticado, false en caso contrario.
  return this.isLoggedIn;
}
 registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

// Método getCurrentUser que devuelve un Observable de un Usuario o null.
getCurrentUser(): Observable<Usuario | null> {
  // Devuelve el Observable currentUser para que otras partes del código puedan escuchar los cambios en el usuario actual.
  return this.currentUser;
}

// Método getUsuarios que devuelve un Observable de un array de Usuarios.
getUsuarios(): Observable<Usuario[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los usuarios.
  return this.http.get<Usuario[]>(this.url);
}
// Método esAdmin que verifica si el usuario actual es administrador.
// Devuelve true si el usuario actual es administrador, false en caso contrario.

addUsuario(newUsuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.url, newUsuario);
}

updateUsuario(id: number, updatedUsuario: Usuario): Observable<Usuario> {
  this.currentUserSubject.next(updatedUsuario);
  return this.http.put<Usuario>(`${this.url}/${id}`, updatedUsuario);
}

deleteUsuario(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}


}
