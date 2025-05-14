import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Motor } from '../../../models/motor.model';
import { MotorService } from '../../../service/motor.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-motor-modificar',
  templateUrl: './motor-modificar.component.html',
  styleUrls: ['./motor-modificar.component.scss']
})
export class MotorModificarComponent implements OnInit {
  @Input() motor: Motor | null = null; // Motor recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Motor>(); // Emite el Motor modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalMotor: Motor | null = null; // Copia del Motor original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private motorService: MotorService) {}

  ngOnInit(): void {
    if (this.motor) {
      // Crear una copia profunda del Motor original
      this.originalMotor = JSON.parse(JSON.stringify(this.motor));
    }
  }

  guardarCambios(): void {
    if (this.motor && this.motor.id_motor) {
      this.motorService.updateMotor(this.motor.id_motor, this.motor).subscribe(
        (response: Motor) => {
          console.log('Motor actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Motor:', error);
          alert('No se pudo actualizar el Motor. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalMotor && this.motor) {
        // Restaurar los datos originales
        this.motor.motor = this.originalMotor.motor;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
