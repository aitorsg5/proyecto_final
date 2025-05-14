import { Component, OnInit } from '@angular/core';
import { CaballosService } from '../../service/caballos.service';
import { Caballos } from '../../models/caballos.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaballosmodificarComponent } from '../modals/caballosmodificar/caballosmodificar.component';


@Component({
  selector: 'app-caballos',
  templateUrl: './caballos.component.html',
  styleUrls: ['./caballos.component.scss']
})
export class CaballosComponent  implements OnInit {

    caballos: Caballos[] = [];
  
    nuevocaballo: Caballos = {
      id: 0,
      caballos: ''
    };
  
  constructor(private modalService: NgbModal, private CaballosService: CaballosService) {}

   ngOnInit(): void {
      this.obtenerCaballos();
      document.body.style.backgroundColor = 'rgb(33, 37, 41)';
    }
  
    obtenerCaballos(): void {
      this.CaballosService.getCaballos().subscribe((data: Caballos[]) => {
        this.caballos = data;
      }, (error) => {
        console.error('Error al cargar los Motores:', error);
        alert('Error al cargar los Motores. Por favor, intenta nuevamente.');
      });
    }
    crearCaballos(): void {
      this.CaballosService.addCaballos(this.nuevocaballo).subscribe(response => {
        alert('Motor creado exitosamente');
        this.resetFormulario(); // Resetea el formulario después de crear el motor
        this.obtenerCaballos();
      }, (error) => {
        console.error('Error al crear motor:', error);
        alert('Hubo un error al registrar el motor.');
      });
    }
    resetFormulario(): void {
      this.nuevocaballo = {
        id: 0,
        caballos: ''
      };
    }
    eliminarcaballos(id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar este caballos?')) {
        this.CaballosService.deleteCaballos(id).subscribe(() => {
          this.caballos = this.caballos.filter(caballo => caballo.id !== id);
          alert('Caballos eliminado correctamente.');
        }, (error) => {
          console.error('Error al eliminar caballos:', error);
          alert('No se pudo eliminar el caballos. Intenta nuevamente.');
        });
      }
    }
    IrAModificarcaballos(caballos: Caballos): void {
        if (!caballos) {
          console.warn('caballos inválido');
          alert('El caballos seleccionado no es válido para modificar.');
          return;
        }
    
        try {
          const modalRef = this.modalService.open(CaballosmodificarComponent, {
            size: 'lg',
            centered: true,
            backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
          });
    
          modalRef.componentInstance.caballos = caballos; // Asegúrate de usar la propiedad correcta
    
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
