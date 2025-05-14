import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Motor } from '../models/motor.model';

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private url = 'http://localhost:3000/api/motor';

  private currentMotorSubject: BehaviorSubject<Motor | null>;
  
public currentMotor: Observable<Motor | null>;

constructor(private http: HttpClient) {
  this.currentMotorSubject = new BehaviorSubject<Motor | null>(null); //Inicia el valor en null;
  this.currentMotor = this.currentMotorSubject.asObservable();//Permite  que toras partes del codigo "escuchen " los cambios de datos
}
// Método getCurrentMotor que devuelve un Observable de un Motor o null.
getCurrentMotor(): Observable<Motor | null> {
  // Devuelve el Observable currentMotor para que otras partes del código puedan escuchar los cambios en el Motor actual.
  return this.currentMotor;
}

// Método getUsuarios que devuelve un Observable de un array de Motor.
getMotor(): Observable<Motor[]> {
  // Realiza una solicitud HTTP GET a la URL especificada para obtener todos los Motores.
  return this.http.get<Motor[]>(this.url);
}

addMotor(newMotor: Motor): Observable<Motor> {
  return this.http.post<Motor>(this.url, newMotor);
}


updateMotor(id: number, updatedMotor: Motor): Observable<Motor> {
  this.currentMotorSubject.next(updatedMotor);
  return this.http.put<Motor>(`${this.url}/${id}`, updatedMotor);
}

deleteMotor(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}

}
