import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cilindrada } from '../models/cilindrada.model';

@Injectable({
  providedIn: 'root'
})
export class CilindradaService {
  private url = 'http://localhost:3000/api/cilindrada';

  private currentCilindradaSubject: BehaviorSubject<Cilindrada | null>;
  
public currentCilindrada: Observable<Cilindrada | null>;

constructor(private http: HttpClient) {
  this.currentCilindradaSubject = new BehaviorSubject<Cilindrada | null>(null); //Inicia el valor en null;
  this.currentCilindrada = this.currentCilindradaSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentCilindrada que devuelve un Observable de un Cilindrada o null.
getCurrentCilindrada(): Observable<Cilindrada | null> {
  // Devuelve el Observable currentCilindrada para que otras partes del código puedan escuchar los cambios en el Cilindrada actual.
  return this.currentCilindrada;
}

// Método getCilindrada que devuelve un Observable de un array de Cilindrada.
getCilindrada(): Observable<Cilindrada[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Cilindrada.
  return this.http.get<Cilindrada[]>(this.url);
}

addCilindrada(newCilindrada: Cilindrada): Observable<Cilindrada> {
  return this.http.post<Cilindrada>(this.url, newCilindrada);
}


updateCilindrada(id: number, updatedCilindrada: Cilindrada): Observable<Cilindrada> {
  this.currentCilindradaSubject.next(updatedCilindrada);
  return this.http.put<Cilindrada>(`${this.url}/${id}`, updatedCilindrada);
}

deleteCilindrada(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
}
