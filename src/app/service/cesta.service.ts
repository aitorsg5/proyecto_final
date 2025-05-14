import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cesta } from '../models/cesta.model';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  private apiUrl = 'http://localhost:3000/api/configuracion_cesta';
  private currentCestaSubject: BehaviorSubject<Cesta | null>;
  public currentCesta: Observable<Cesta | null>;

  constructor(private http: HttpClient) {
    this.currentCestaSubject = new BehaviorSubject<Cesta | null>(null); // Inicia el valor en null
    this.currentCesta = this.currentCestaSubject.asObservable(); // Permite que todas las partes del código "escuchen" los cambios de datos
  }

  // Método getCurrentCesta que devuelve un Observable de una Cesta o null.
  getCurrentCesta(): Observable<Cesta | null> {
    // Devuelve el Observable currentCesta para que otras partes del código puedan escuchar los cambios en la Cesta actual.
    return this.currentCesta;
  }

  // Método getCesta devuelve un Observable de un array de Cesta.
  getCestas(): Observable<Cesta[]> {
    // Realiza una solicitud HTTP GET a la URL especificada para obtener todas las Cestas.
    return this.http.get<Cesta[]>(this.apiUrl);
  }

  // Método para añadir una nueva Cesta.
  addCesta(newCesta: Cesta): Observable<Cesta> {
    return this.http.post<Cesta>(this.apiUrl, newCesta);
  }

  // Método para actualizar una Cesta existente.
  updateCesta(id: number, updatedCesta: Cesta): Observable<Cesta> {
    this.currentCestaSubject.next(updatedCesta);
    return this.http.put<Cesta>(`${this.apiUrl}/${id}`, updatedCesta);
  }

  // Método para eliminar una Cesta por su ID.
  deleteCesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
