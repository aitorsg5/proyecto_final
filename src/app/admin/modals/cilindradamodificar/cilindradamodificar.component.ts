import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Cilindrada } from '../../../models/cilindrada.model';
import { CilindradaService } from '../../../service/cilindrada.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cilindradamodificar',
  templateUrl: './cilindradamodificar.component.html',
  styleUrls: ['./cilindradamodificar.component.scss']
})
export class CilindradamodificarComponent implements OnInit {

  @Input() cilindrada: Cilindrada | null = null; // Cilindrada recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Cilindrada>(); // Emite el Cilindrada modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.
  originalcilindrada: Cilindrada | null = null; // Copia del Cilindrada original para restaurar si se cancela.

    constructor(public activeModal: NgbActiveModal, private CilindradaService: CilindradaService) {}

    ngOnInit(): void {
      if (this.cilindrada) {
        // Crear una copia profunda de los caballos originales
        this.originalcilindrada = JSON.parse(JSON.stringify(this.cilindrada));
      }
    }
  
    guardarCambios(): void {
      if (this.cilindrada && this.cilindrada.id_cilindrada) {
        this.CilindradaService.updateCilindrada(this.cilindrada.id_cilindrada, this.cilindrada).subscribe(
          (response: Cilindrada) => {
            console.log('Cilindrada actualizado:', response);
            alert('Cambios guardados exitosamente.');
            this.activeModal.close(response); // Cierra el modal y envía el resultado
          },
          (error) => {
            console.error('Error al actualizar Cilindrada:', error);
            alert('No se pudo actualizar los Cilindrada. Intenta nuevamente.');
          }
        );
      } else {
        alert('No hay datos para guardar.');
      }
    }
  
    cerrarModal(): void {
      if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
        if (this.originalcilindrada && this.cilindrada) {
          // Restaurar los datos originales
          this.cilindrada.cilindrada = this.originalcilindrada.cilindrada;
        }
        this.activeModal.close(); // Cerrar el modal
      }
    }
  }

