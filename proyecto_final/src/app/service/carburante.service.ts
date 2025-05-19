import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Carburante } from '../models/carburante.model';


@Injectable({
  providedIn: 'root'
})
export class CarburanteService {

  private url = 'http://localhost:3000/api/carburante';

  private currentCarburanteSubject: BehaviorSubject<Carburante | null>;
  
public currentCarburante: Observable<Carburante | null>;

constructor(private http: HttpClient) {
  this.currentCarburanteSubject = new BehaviorSubject<Carburante | null>(null); //Inicia el valor en null;
  this.currentCarburante = this.currentCarburanteSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentCarburante que devuelve un Observable de un Carburante o null.
getCurrentCarburante(): Observable<Carburante | null> {
  // Devuelve el Observable currentCarburante para que otras partes del código puedan escuchar los cambios en el Carburante actual.
  return this.currentCarburante;
}

// Método getCarburante que devuelve un Observable de un array de Carburante.
getCarburante(): Observable<Carburante[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Carburante.
  return this.http.get<Carburante[]>(this.url);
}

addCarburante(newCarburante: Carburante): Observable<Carburante> {
  return this.http.post<Carburante>(this.url, newCarburante);
}


updateCarburante(id: number, updatedCarburante: Carburante): Observable<Carburante> {
  this.currentCarburanteSubject.next(updatedCarburante);
  return this.http.put<Carburante>(`${this.url}/${id}`, updatedCarburante);
}

deleteCarburante(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
