import { Component, OnInit } from '@angular/core';
import { MotorService } from '../../service/motor.service';
import { Motor } from '../../models/motor.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MotorModificarComponent } from '../modals/motor-modificar/motor-modificar.component';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['../usuarios/usuarios.component.scss']
})
export class MotorComponent implements OnInit {
  Motores: Motor[] = [];

  nuevoMotor: Motor = {
    id_motor: 0,
    motor: ''
  };

  constructor(private modalService: NgbModal, private motorService: MotorService) {}

  ngOnInit(): void {
    this.obtenerMotores();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerMotores(): void {
    this.motorService.getMotor().subscribe((data: Motor[]) => {
      this.Motores = data;
    }, (error) => {
      console.error('Error al cargar los Motores:', error);
      alert('Error al cargar los Motores. Por favor, intenta nuevamente.');
    });
  }

  crearMotores(): void {
    this.motorService.addMotor(this.nuevoMotor).subscribe(response => {
      alert('Motor creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el motor
      this.obtenerMotores();
    }, (error) => {
      console.error('Error al crear motor:', error);
      alert('Hubo un error al registrar el motor.');
    });
  }

  resetFormulario(): void {
    this.nuevoMotor = {
      id_motor: 0,
      motor: ''
    };
  }

  eliminarMotor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este Motor?')) {
      this.motorService.deleteMotor(id).subscribe(() => {
        this.Motores = this.Motores.filter(motor => motor.id_motor !== id);
        alert('Motor eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar motor:', error);
        alert('No se pudo eliminar el motor. Intenta nuevamente.');
      });
    }
  }

  IrAModificarMotor(motor: Motor): void {
    if (!motor) {
      console.warn('Motor inválido');
      alert('El motor seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(MotorModificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.motor = motor; // Asegúrate de usar la propiedad correcta

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
