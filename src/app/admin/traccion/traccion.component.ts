import { Component, OnInit } from '@angular/core';
import { TraccionService } from '../../service/traccion.service';
import { Traccion } from '../../models/traccion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TraccionModificarComponent } from '../modals/traccionmodificar/traccionmodificar.component';

@Component({
  selector: 'app-traccion',
  templateUrl: './traccion.component.html',
  styleUrls: ['./traccion.component.scss']
})
export class TraccionComponent implements OnInit {
  tracciones: Traccion[] = [];
  
  nuevaTraccion: Traccion = {
    id_traccion: 0,
    traccion: ''
  };

  constructor(private modalService: NgbModal, private traccionService: TraccionService) {}

  ngOnInit(): void {
    this.obtenerTracciones();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerTracciones(): void {
    this.traccionService.getTraccion().subscribe((data: Traccion[]) => {
      this.tracciones = data;
    }, (error) => {
      console.error('Error al cargar las tracciones:', error);
      alert('Error al cargar las tracciones. Por favor, intenta nuevamente.');
    });
  }

  crearTraccion(): void {
    this.traccionService.addTraccion(this.nuevaTraccion).subscribe(response => {
      alert('Tracción creada exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear la tracción
      this.obtenerTracciones();
    }, (error) => {
      console.error('Error al crear la tracción:', error);
      alert('Hubo un error al registrar la tracción.');
    });
  }

  resetFormulario(): void {
    this.nuevaTraccion = {
      id_traccion: 0,
      traccion: ''
    };
  }

  eliminarTraccion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tracción?')) {
      this.traccionService.deleteTraccion(id).subscribe(() => {
        this.tracciones = this.tracciones.filter(traccion => traccion.id_traccion !== id);
        alert('Tracción eliminada correctamente.');
      }, (error) => {
        console.error('Error al eliminar la tracción:', error);
        alert('No se pudo eliminar la tracción. Intenta nuevamente.');
      });
    }
  }

  IrAModificarTraccion(traccion: Traccion): void {
    if (!traccion) {
      console.warn('Tracción inválida');
      alert('La tracción seleccionada no es válida para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(TraccionModificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.traccion = traccion; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación de la tracción.');
    }
  }
}
