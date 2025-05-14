import { Component, OnInit } from '@angular/core';
import { CarburanteService } from '../../service/carburante.service';
import { Carburante } from '../../models/carburante.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarburantemodificarComponent } from '../modals/carburantemodificar/carburantemodificar.component'; // Asegúrate de importar el componente correcto

@Component({
  selector: 'app-carburante',
  templateUrl: './carburante.component.html',
  styleUrls: ['./carburante.component.scss']
})
export class CarburanteComponent implements OnInit {
  carburantes: Carburante[] = [];
  
  nuevoCarburante: Carburante = {
    id_carburante: 0,
    carburante: ''
  };

  constructor(private modalService: NgbModal, private carburanteService: CarburanteService) {}

  ngOnInit(): void {
    this.obtenerCarburantes();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerCarburantes(): void {
    this.carburanteService.getCarburante().subscribe((data: Carburante[]) => {
      this.carburantes = data;
    }, (error) => {
      console.error('Error al cargar los carburantes:', error);
      alert('Error al cargar los carburantes. Por favor, intenta nuevamente.');
    });
  }

  crearCarburante(): void {
    this.carburanteService.addCarburante(this.nuevoCarburante).subscribe(response => {
      alert('Carburante creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el carburante
      this.obtenerCarburantes();
    }, (error) => {
      console.error('Error al crear carburante:', error);
      alert('Hubo un error al registrar el carburante.');
    });
  }

  resetFormulario(): void {
    this.nuevoCarburante = {
      id_carburante: 0,
      carburante: ''
    };
  }

  eliminarCarburante(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este carburante?')) {
      this.carburanteService.deleteCarburante(id).subscribe(() => {
        this.carburantes = this.carburantes.filter(carburante => carburante.id_carburante !== id);
        alert('Carburante eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar carburante:', error);
        alert('No se pudo eliminar el carburante. Intenta nuevamente.');
      });
    }
  }

  IrAModificarCarburante(carburante: Carburante): void {
    if (!carburante) {
      console.warn('Carburante inválido');
      alert('El carburante seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(CarburantemodificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.carburante = carburante; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación del carburante.');
    }
  }
}
