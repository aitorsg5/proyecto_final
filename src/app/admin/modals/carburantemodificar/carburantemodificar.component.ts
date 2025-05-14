import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Carburante } from '../../../models/carburante.model';
import { CarburanteService } from '../../../service/carburante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carburantemodificar',
  templateUrl: './carburantemodificar.component.html',
  styleUrls: ['./carburantemodificar.component.scss']
})
export class CarburantemodificarComponent implements OnInit {

  @Input() carburante: Carburante | null = null; // Carburante recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Carburante>(); // Emite el Carburante modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalCarburante: Carburante | null = null; // Copia del Carburante original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private carburanteService: CarburanteService) {}

  ngOnInit(): void {
    if (this.carburante) {
      // Crear una copia profunda del carburante original
      this.originalCarburante = JSON.parse(JSON.stringify(this.carburante));
    }
  }

  guardarCambios(): void {
    if (this.carburante && this.carburante.id_carburante) {
      this.carburanteService.updateCarburante(this.carburante.id_carburante, this.carburante).subscribe(
        (response: Carburante) => {
          console.log('Carburante actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Carburante:', error);
          alert('No se pudo actualizar el Carburante. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalCarburante && this.carburante) {
        // Restaurar los datos originales
        this.carburante.carburante = this.originalCarburante.carburante;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
