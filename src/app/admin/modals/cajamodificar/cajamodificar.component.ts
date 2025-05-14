import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Caja } from '../../../models/caja.model';
import { CajaService } from '../../../service/caja.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cajamodificar',
  templateUrl: './cajamodificar.component.html',
  styleUrls: ['./cajamodificar.component.scss']
})
export class CajamodificarComponent implements OnInit {

  @Input() caja: Caja | null = null; // Caja recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Caja>(); // Emite el Caja modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalCaja: Caja | null = null; // Copia del Caja original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private cajaService: CajaService) {}

  ngOnInit(): void {
    if (this.caja) {
      // Crear una copia profunda de la caja original
      this.originalCaja = JSON.parse(JSON.stringify(this.caja));
    }
  }

  guardarCambios(): void {
    if (this.caja && this.caja.id_caja) {
      this.cajaService.updateCaja(this.caja.id_caja, this.caja).subscribe(
        (response: Caja) => {
          console.log('Caja actualizada:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Caja:', error);
          alert('No se pudo actualizar la Caja. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalCaja && this.caja) {
        // Restaurar los datos originales
        this.caja.nombre_caja = this.originalCaja.nombre_caja;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
