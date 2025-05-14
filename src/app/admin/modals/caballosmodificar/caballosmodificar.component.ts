import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Caballos } from '../../../models/caballos.model';
import { CaballosService } from '../../../service/caballos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caballosmodificar',
  templateUrl: './caballosmodificar.component.html',
  styleUrls: ['./caballosmodificar.component.scss']
})
export class CaballosmodificarComponent implements OnInit {

  @Input() caballos: Caballos | null = null; // Caballos recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Caballos>(); // Emite el Caballos modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalCaballos: Caballos | null = null; // Copia del Caballos original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private caballosService: CaballosService) {}

  ngOnInit(): void {
    if (this.caballos) {
      // Crear una copia profunda de los caballos originales
      this.originalCaballos = JSON.parse(JSON.stringify(this.caballos));
    }
  }

  guardarCambios(): void {
    if (this.caballos && this.caballos.id) {
      this.caballosService.updateCaballos(this.caballos.id, this.caballos).subscribe(
        (response: Caballos) => {
          console.log('Caballos actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Caballos:', error);
          alert('No se pudo actualizar los Caballos. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalCaballos && this.caballos) {
        // Restaurar los datos originales
        this.caballos.caballos = this.originalCaballos.caballos;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
