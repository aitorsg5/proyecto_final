import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../service/modelo.service';
import { Modelo } from '../../models/modelo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeloModificarComponent } from '../modals/modelomodificar/modelomodificar.component';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {
  modelos: Modelo[] = [];
  
  nuevoModelo: Modelo = {
    id_modelo: 0,
    modelo: ''
  };

  constructor(private modalService: NgbModal, private modeloService: ModeloService) {}

  ngOnInit(): void {
    this.obtenerModelos();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerModelos(): void {
    this.modeloService.getModelo().subscribe((data: Modelo[]) => {
      this.modelos = data;
    }, (error) => {
      console.error('Error al cargar los modelos:', error);
      alert('Error al cargar los modelos. Por favor, intenta nuevamente.');
    });
  }

  crearModelo(): void {
    this.modeloService.addModelo(this.nuevoModelo).subscribe(response => {
      alert('Modelo creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el modelo
      this.obtenerModelos();
    }, (error) => {
      console.error('Error al crear el modelo:', error);
      alert('Hubo un error al registrar el modelo.');
    });
  }

  resetFormulario(): void {
    this.nuevoModelo = {
      id_modelo: 0,
      modelo: ''
    };
  }

  eliminarModelo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este modelo?')) {
      this.modeloService.deleteModelo(id).subscribe(() => {
        this.modelos = this.modelos.filter(modelo => modelo.id_modelo !== id);
        alert('Modelo eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar el modelo:', error);
        alert('No se pudo eliminar el modelo. Intenta nuevamente.');
      });
    }
  }

  IrAModificarModelo(modelo: Modelo): void {
    if (!modelo) {
      console.warn('Modelo inválido');
      alert('El modelo seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(ModeloModificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.modelo = modelo; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación del modelo.');
    }
  }
}
