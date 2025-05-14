import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../service/caja.service';
import { Caja } from '../../models/caja.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CajamodificarComponent } from '../modals/cajamodificar/cajamodificar.component'; // Asegúrate de importar el componente correcto

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {
  caja: Caja[] = [];
  
  nuevaCaja: Caja = {
    id_caja: 0,
    nombre_caja: ''
  };

  constructor(private modalService: NgbModal, private cajaService: CajaService) {}

  ngOnInit(): void {
    this.obtenerCajas();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerCajas(): void {
    this.cajaService.getCaja().subscribe((data: Caja[]) => {
      this.caja = data;
    }, (error) => {
      console.error('Error al cargar las cajas:', error);
      alert('Error al cargar las cajas. Por favor, intenta nuevamente.');
    });
  }

  crearCaja(): void {
    this.cajaService.addCaja(this.nuevaCaja).subscribe(response => {
      alert('Caja creada exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear la caja
      this.obtenerCajas();
    }, (error) => {
      console.error('Error al crear caja:', error);
      alert('Hubo un error al registrar la caja.');
    });
  }

  resetFormulario(): void {
    this.nuevaCaja = {
      id_caja: 0,
      nombre_caja: ''
    };
  }

  eliminarCaja(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta caja?')) {
      this.cajaService.deleteCaja(id).subscribe(() => {
        this.caja = this.caja.filter(caja => caja.id_caja !== id);
        alert('Caja eliminada correctamente.');
      }, (error) => {
        console.error('Error al eliminar caja:', error);
        alert('No se pudo eliminar la caja. Intenta nuevamente.');
      });
    }
  }

  IrAModificarCaja(caja: Caja): void {
    if (!caja) {
      console.warn('Caja inválida');
      alert('La caja seleccionada no es válida para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(CajamodificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.caja = caja; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación de la caja.');
    }
  }
}
