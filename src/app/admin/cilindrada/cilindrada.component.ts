import { Component, OnInit } from '@angular/core';
import { CilindradaService } from '../../service/cilindrada.service';
import { Cilindrada } from '../../models/cilindrada.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CilindradamodificarComponent } from '../modals/cilindradamodificar/cilindradamodificar.component';


@Component({
  selector: 'app-cilindrada',
  templateUrl: './cilindrada.component.html',
  styleUrls: ['./cilindrada.component.scss']
})
export class CilindradaComponent  implements OnInit  {

  cilindrada: Cilindrada[] = [];

   nuevacilindrada: Cilindrada = {
    id_cilindrada: 0,
    cilindrada: ''
      };
    constructor(private modalService: NgbModal, private CilindradaService: CilindradaService) {}
  
ngOnInit(): void {
      this.obtenerCilindrada();
      document.body.style.backgroundColor = 'rgb(33, 37, 41)';
    }
  
    obtenerCilindrada(): void {
      this.CilindradaService.getCilindrada().subscribe((data: Cilindrada[]) => {
        this.cilindrada = data;
      }, (error) => {
        console.error('Error al cargar las cilindradas:', error);
        alert('Error al cargar las cilindradas. Por favor, intenta nuevamente.');
      });
    }
    crearCilindrada(): void {
      this.CilindradaService.addCilindrada(this.nuevacilindrada).subscribe(response => {
        alert('cilindrada creado exitosamente');
        this.resetFormulario(); // Resetea el formulario después de crear el motor
        this.obtenerCilindrada();
      }, (error) => {
        console.error('Error al crear motor:', error);
        alert('Hubo un error al registrar el motor.');
      });
    }
    resetFormulario(): void {
      this.nuevacilindrada = {
        id_cilindrada: 0,
        cilindrada: ''
      };
    }
    eliminarCilindrada(id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar este cilindrada?')) {
        this.CilindradaService.deleteCilindrada(id).subscribe(() => {
          this.cilindrada = this.cilindrada.filter(caballo => caballo.id_cilindrada !== id);
          alert('cilindrada eliminado correctamente.');
        }, (error) => {
          console.error('Error al eliminar cilindrada:', error);
          alert('No se pudo eliminar el cilindrada. Intenta nuevamente.');
        });
      }
    }

      IrAModificarCilindrada(cilindrada: Cilindrada): void {
            if (!cilindrada) {
              console.warn('cilindrada inválido');
              alert('El cilindrada seleccionado no es válido para modificar.');
              return;
            }
        
            try {
              const modalRef = this.modalService.open(CilindradamodificarComponent, {
                size: 'lg',
                centered: true,
                backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
              });
        
              modalRef.componentInstance.cilindrada = cilindrada; // Asegúrate de usar la propiedad correcta
        
              modalRef.result
                .then(() => {
                  console.log('Modal cerrado exitosamente.');
                })
                .catch((error) => {
                  console.warn('El modal fue cerrado sin cambios.', error);
                });
        
            } catch (error) {
              console.error('Error al abrir el modal de modificación:', error);
              alert('Hubo un problema al intentar abrir la pantalla de modificación del motor.');
            }
          }

}
