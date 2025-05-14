import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedido';
  private currentPedidoSubject: BehaviorSubject<Pedido | null>;
  public currentPedido: Observable<Pedido | null>;

  constructor(private http: HttpClient) {
    this.currentPedidoSubject = new BehaviorSubject<Pedido | null>(null); // Inicia el valor en null
    this.currentPedido = this.currentPedidoSubject.asObservable(); // Permite que todas las partes del código "escuchen" los cambios de datos
  }

  // Método getCurrentPedido que devuelve un Observable de un Pedido o null.
  getCurrentPedido(): Observable<Pedido | null> {
    // Devuelve el Observable currentPedido para que otras partes del código puedan escuchar los cambios en el Pedido actual.
    return this.currentPedido;
  }

  // Método getPedidos devuelve un Observable de un array de Pedido.
  getPedidos(): Observable<Pedido[]> {
    // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Pedidos.
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Método para añadir un nuevo Pedido.
  addPedido(newPedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, newPedido);
  }

  // Método para actualizar un Pedido existente.
  updatePedido(id: number, updatedPedido: Pedido): Observable<Pedido> {
    this.currentPedidoSubject.next(updatedPedido);
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, updatedPedido);
  }

  // Método para eliminar un Pedido por su ID.
  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
