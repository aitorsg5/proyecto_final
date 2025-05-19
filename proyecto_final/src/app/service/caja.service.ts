import { Injectable } from '@angular/core';
import { Caja } from '../models/caja.model';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private url = 'http://localhost:3000/api/caja';
    private currentCajaSubject: BehaviorSubject<Caja | null>;
    
    public currentCaja: Observable<Caja | null>;

constructor(private http: HttpClient) {
  this.currentCajaSubject = new BehaviorSubject<Caja | null>(null); //Inicia el valor en null;
  this.currentCaja = this.currentCajaSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentCaja que devuelve un Observable de un Caja o null.
getCurrentCaja(): Observable<Caja | null> {
  // Devuelve el Observable currentCaja para que otras partes del código puedan escuchar los cambios en el Caja actual.
  return this.currentCaja;
}
// Método getCaja devuelve un Observable de un array de Caja.
getCaja(): Observable<Caja[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Cajas.
  return this.http.get<Caja[]>(this.url);
}
addCaja(newCaja: Caja): Observable<Caja> {
  return this.http.post<Caja>(this.url, newCaja);
}


updateCaja(id: number, updatedCaja: Caja): Observable<Caja> {
  this.currentCajaSubject.next(updatedCaja);
  return this.http.put<Caja>(`${this.url}/${id}`, updatedCaja);
}

deleteCaja(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
