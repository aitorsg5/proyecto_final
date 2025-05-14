import { Injectable } from '@angular/core';
import { Caballos } from '../models/caballos.model';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CaballosService {
  private url = 'http://localhost:3000/api/caballos';
  private currentCaballosSubject: BehaviorSubject<Caballos | null>;
  public currentCaballos: Observable<Caballos | null>;

constructor(private http: HttpClient) {
  this.currentCaballosSubject = new BehaviorSubject<Caballos | null>(null); //Inicia el valor en null;
  this.currentCaballos = this.currentCaballosSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentCaballos que devuelve un Observable de un Caballos o null.
getCurrentCaballos(): Observable<Caballos | null> {
  // Devuelve el Observable currentCaballos para que otras partes del código puedan escuchar los cambios en el Caballos actual.
  return this.currentCaballos;
}
// Método getCaballos devuelve un Observable de un array de Caballos.
getCaballos(): Observable<Caballos[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Caballos.
  return this.http.get<Caballos[]>(this.url);
}
addCaballos(newCaballos: Caballos): Observable<Caballos> {
  return this.http.post<Caballos>(this.url, newCaballos);
}


updateCaballos(id: number, updatedCaballos: Caballos): Observable<Caballos> {
  this.currentCaballosSubject.next(updatedCaballos);
  return this.http.put<Caballos>(`${this.url}/${id}`, updatedCaballos);
}

deleteCaballos(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
