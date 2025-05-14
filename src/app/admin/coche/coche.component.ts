import { Component, OnInit } from '@angular/core';
import { CocheService } from '../../service/coche.service';
import { Coche } from '../../models/coche.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CocheModificarComponent } from '../modals/coche-modificar/coche-modificar.component';

import { MotorService } from '../../service/motor.service';
import { CaballosService } from '../../service/caballos.service';
import { ModeloService } from '../../service/modelo.service';
import { CajaService } from '../../service/caja.service';
import { CarburanteService } from '../../service/carburante.service';
import { TraccionService } from '../../service/traccion.service';
import { CilindradaService } from '../../service/cilindrada.service';

import { Motor } from '../../models/motor.model';
import { Caballos } from '../../models/caballos.model';
import { Modelo } from '../../models/modelo.model';
import { Caja } from '../../models/caja.model';
import { Carburante } from '../../models/carburante.model';
import { Traccion } from '../../models/traccion.model';
import { Cilindrada } from '../../models/cilindrada.model';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.scss']
})
export class CocheComponent implements OnInit {
  coches: Coche[] = [];
  motores: Motor[] = [];
  caballos: Caballos[] = [];
  modelos: Modelo[] = [];
  cajas: Caja[] = [];
  carburantes: Carburante[] = [];
  tracciones: Traccion[] = [];
  cilindradas: Cilindrada[] = [];

  nuevoCoche: Coche = {
    id_coche: 0,
    precio: 0,
    imagen: '',
    descripcion: '',
    fecha_de_fabricacion: new Date(),
    id_motor: 0,
    id_caballos: 0,
    id_modelo: 0,
    id_caja: 0,
    id_carburante: 0,
    id_traccion: 0,
    id_cilindrada: 0
  };

  constructor(
    private modalService: NgbModal,
    private cocheService: CocheService,
    private motorService: MotorService,
    private caballosService: CaballosService,
    private modeloService: ModeloService,
    private cajaService: CajaService,
    private carburanteService: CarburanteService,
    private traccionService: TraccionService,
    private cilindradaService: CilindradaService
  ) {}

  ngOnInit(): void {
    this.obtenerCoches();
    this.obtenerMotores();
    this.obtenerCaballos();
    this.obtenerModelos();
    this.obtenerCajas();
    this.obtenerCarburantes();
    this.obtenerTracciones();
    this.obtenerCilindradas();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerCoches(): void {
    this.cocheService.getCoche().subscribe((data: Coche[]) => {
      this.coches = data;
    }, (error) => {
      console.error('Error al cargar los coches:', error);
      alert('Error al cargar los coches. Por favor, intenta nuevamente.');
    });
  }

  obtenerMotores(): void {
    this.motorService.getMotor().subscribe((data: Motor[]) => {
      this.motores = data;
    }, (error) => {
      console.error('Error al cargar los motores:', error);
      alert('Error al cargar los motores. Por favor, intenta nuevamente.');
    });
  }

  obtenerCaballos(): void {
    this.caballosService.getCaballos().subscribe((data: Caballos[]) => {
      this.caballos = data;
    }, (error) => {
      console.error('Error al cargar los caballos:', error);
      alert('Error al cargar los caballos. Por favor, intenta nuevamente.');
    });
  }

  obtenerModelos(): void {
    this.modeloService.getModelo().subscribe((data: Modelo[]) => {
      this.modelos = data;
    }, (error) => {
      console.error('Error al cargar los modelos:', error);
      alert('Error al cargar los modelos. Por favor, intenta nuevamente.');
    });
  }

  obtenerCajas(): void {
    this.cajaService.getCaja().subscribe((data: Caja[]) => {
      this.cajas = data;
    }, (error) => {
      console.error('Error al cargar las cajas:', error);
      alert('Error al cargar las cajas. Por favor, intenta nuevamente.');
    });
  }

  obtenerCarburantes(): void {
    this.carburanteService.getCarburante().subscribe((data: Carburante[]) => {
      this.carburantes = data;
    }, (error) => {
      console.error('Error al cargar los carburantes:', error);
      alert('Error al cargar los carburantes. Por favor, intenta nuevamente.');
    });
  }

  obtenerTracciones(): void {
    this.traccionService.getTraccion().subscribe((data: Traccion[]) => {
      this.tracciones = data;
    }, (error) => {
      console.error('Error al cargar las tracciones:', error);
      alert('Error al cargar las tracciones. Por favor, intenta nuevamente.');
    });
  }

  obtenerCilindradas(): void {
    this.cilindradaService.getCilindrada().subscribe((data: Cilindrada[]) => {
      this.cilindradas = data;
    }, (error) => {
      console.error('Error al cargar las cilindradas:', error);
      alert('Error al cargar las cilindradas. Por favor, intenta nuevamente.');
    });
  }

  crearCoche(): void {
    this.cocheService.addCoche(this.nuevoCoche).subscribe(response => {
      alert('Coche creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el coche
      this.obtenerCoches();
    }, (error) => {
      console.error('Error al crear el coche:', error);
      alert('Hubo un error al registrar el coche.');
    });
  }

  resetFormulario(): void {
    this.nuevoCoche = {
      id_coche: 0,
      precio: 0,
      imagen: '',
      descripcion: '',
      fecha_de_fabricacion: new Date(),
      id_motor: 0,
      id_caballos: 0,
      id_modelo: 0,
      id_caja: 0,
      id_carburante: 0,
      id_traccion: 0,
      id_cilindrada: 0
    };
  }

  eliminarCoche(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este coche?')) {
      this.cocheService.deleteCoche(id).subscribe(() => {
        this.coches = this.coches.filter(coche => coche.id_coche !== id);
        alert('Coche eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar el coche:', error);
        alert('No se pudo eliminar el coche. Intenta nuevamente.');
      });
    }
  }

  IrAModificarCoche(coche: Coche): void {
    if (!coche) {
      console.warn('Coche inválido');
      alert('El coche seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(CocheModificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.coche = coche; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación del coche.');
    }
  }

  obtenerNombreMotor(id_motor: number): string {
    const motor = this.motores.find(m => m.id_motor === id_motor);
    return motor ? motor.motor : '';
  }

  obtenerNombreCaballos(id_caballos: number): string {
    const caballos = this.caballos.find(c => c.id === id_caballos);
    return caballos ? caballos.caballos : '';
  }

  obtenerNombreModelo(id_modelo: number): string {
    const modelo = this.modelos.find(m => m.id_modelo === id_modelo);
    return modelo ? modelo.modelo : '';
  }

  obtenerNombreCaja(id_caja: number): string {
    const caja = this.cajas.find(c => c.id_caja === id_caja);
    return caja ? caja.nombre_caja : '';
  }

  obtenerNombreCarburante(id_carburante: number): string {
    const carburante = this.carburantes.find(c => c.id_carburante === id_carburante);
    return carburante ? carburante.carburante : '';
  }

  obtenerNombreTraccion(id_traccion: number): string {
    const traccion = this.tracciones.find(t => t.id_traccion === id_traccion);
    return traccion ? traccion.traccion : '';
  }

  obtenerNombreCilindrada(id_cilindrada: number): string {
    const cilindrada = this.cilindradas.find(c => c.id_cilindrada === id_cilindrada);
    return cilindrada ? cilindrada.cilindrada.toString() : '';
  }
}
