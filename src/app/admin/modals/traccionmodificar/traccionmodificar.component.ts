import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Traccion } from '../../../models/traccion.model';
import { TraccionService } from '../../../service/traccion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-traccion-modificar',
  templateUrl: './traccionmodificar.component.html',
  styleUrls: ['./traccionmodificar.component.scss']
})
export class TraccionModificarComponent implements OnInit {

  @Input() traccion: Traccion | null = null; // Tracción recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Traccion>(); // Emite el Tracción modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalTraccion: Traccion | null = null; // Copia del Tracción original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private traccionService: TraccionService) {}

  ngOnInit(): void {
    if (this.traccion) {
      // Crear una copia profunda del tracción original
      this.originalTraccion = JSON.parse(JSON.stringify(this.traccion));
    }
  }

  guardarCambios(): void {
    if (this.traccion && this.traccion.id_traccion) {
      this.traccionService.updateTraccion(this.traccion.id_traccion, this.traccion).subscribe(
        (response: Traccion) => {
          console.log('Tracción actualizada:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Tracción:', error);
          alert('No se pudo actualizar la Tracción. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalTraccion && this.traccion) {
        // Restaurar los datos originales
        this.traccion.traccion = this.originalTraccion.traccion;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
