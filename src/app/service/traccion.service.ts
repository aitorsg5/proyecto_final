import { Injectable } from '@angular/core';
import { Traccion } from '../models/traccion.model';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TraccionService {
  private url = 'http://localhost:3000/api/traccion';
  private currentTraccionSubject: BehaviorSubject<Traccion | null>;
  
  public currentTraccion: Observable<Traccion | null>;
  

constructor(private http: HttpClient) {
  this.currentTraccionSubject = new BehaviorSubject<Traccion | null>(null); //Inicia el valor en null;
  this.currentTraccion = this.currentTraccionSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentTraccion que devuelve un Observable de un Traccion o null.
getCurrentTraccion(): Observable<Traccion | null> {
  // Devuelve el Observable currentTraccion para que otras partes del código puedan escuchar los cambios en el Traccion actual.
  return this.currentTraccion;
}
// Método getTraccionque devuelve un Observable de un array de Traccion.
getTraccion(): Observable<Traccion[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Tracciones.
  return this.http.get<Traccion[]>(this.url);
}
addTraccion(newTraccion: Traccion): Observable<Traccion> {
  return this.http.post<Traccion>(this.url, newTraccion);
}


updateTraccion(id: number, updatedTraccion: Traccion): Observable<Traccion> {
  this.currentTraccionSubject.next(updatedTraccion);
  return this.http.put<Traccion>(`${this.url}/${id}`, updatedTraccion);
}

deleteTraccion(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
