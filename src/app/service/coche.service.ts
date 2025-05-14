import { Injectable } from '@angular/core';
import { Coche } from '../models/coche.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private url = 'http://localhost:3000/api/coche';
  private currentCocheSubject: BehaviorSubject<Coche | null>;
  public currentCoche: Observable<Coche | null>;

  constructor(private http: HttpClient) {
    this.currentCocheSubject = new BehaviorSubject<Coche | null>(null); // Inicia el valor en null;
    this.currentCoche = this.currentCocheSubject.asObservable(); // Permite que todas partes del código "escuchen" los cambios de datos
  }

  // Método getCurrentCoche que devuelve un Observable de un Coche o null.
  getCurrentCoche(): Observable<Coche | null> {
    // Devuelve el Observable currentCoche para que otras partes del código puedan escuchar los cambios en el Coche actual.
    return this.currentCoche;
  }

  // Método getCoche devuelve un Observable de un array de Coche.
  getCoche(): Observable<Coche[]> {
    // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Coches.
    return this.http.get<Coche[]>(this.url);
  }

  // Método para añadir un nuevo Coche.
  addCoche(newCoche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.url, newCoche);
  }

  // Método para actualizar un Coche existente.
  updateCoche(id: number, updatedCoche: Coche): Observable<Coche> {
    this.currentCocheSubject.next(updatedCoche);
    return this.http.put<Coche>(`${this.url}/${id}`, updatedCoche);
  }

  // Método para eliminar un Coche por su ID.
  deleteCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
