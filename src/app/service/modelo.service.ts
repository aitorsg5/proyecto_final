import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo.model';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private url = 'http://localhost:3000/api/modelo';
    private currentmodeloSubject: BehaviorSubject<Modelo | null>;
  
    public currentModelo: Observable<Modelo | null>;

constructor(private http: HttpClient) {
  this.currentmodeloSubject = new BehaviorSubject<Modelo | null>(null); //Inicia el valor en null;
  this.currentModelo = this.currentmodeloSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}

// Método getCurrentModelo que devuelve un Observable de un Modelo o null.
getCurrentModelo(): Observable<Modelo | null> {
  // Devuelve el Observable currentModelo para que otras partes del código puedan escuchar los cambios en el Modelo actual.
  return this.currentModelo;
}
// Método getModelo devuelve un Observable de un array de Modelo.
getModelo(): Observable<Modelo[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Modelos.
  return this.http.get<Modelo[]>(this.url);
}
addModelo(newModelo: Modelo): Observable<Modelo> {
  return this.http.post<Modelo>(this.url, newModelo);
}


updateModelo(id: number, updatedModelo: Modelo): Observable<Modelo> {
  this.currentmodeloSubject.next(updatedModelo);
  return this.http.put<Modelo>(`${this.url}/${id}`, updatedModelo);
}

deleteModelo(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}

}
