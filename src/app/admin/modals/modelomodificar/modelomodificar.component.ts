import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Modelo } from '../../../models/modelo.model';
import { ModeloService } from '../../../service/modelo.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modelo-modificar',
  templateUrl: './modelomodificar.component.html',
  styleUrls: ['./modelomodificar.component.scss']
})
export class ModeloModificarComponent implements OnInit {

  @Input() modelo: Modelo | null = null; // Modelo recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Modelo>(); // Emite el Modelo modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalModelo: Modelo | null = null; // Copia del Modelo original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private modeloService: ModeloService) {}

  ngOnInit(): void {
    if (this.modelo) {
      // Crear una copia profunda del modelo original
      this.originalModelo = JSON.parse(JSON.stringify(this.modelo));
    }
  }

  guardarCambios(): void {
    if (this.modelo && this.modelo.id_modelo) {
      this.modeloService.updateModelo(this.modelo.id_modelo, this.modelo).subscribe(
        (response: Modelo) => {
          console.log('Modelo actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Modelo:', error);
          alert('No se pudo actualizar el Modelo. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalModelo && this.modelo) {
        // Restaurar los datos originales
        this.modelo.modelo = this.originalModelo.modelo;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
