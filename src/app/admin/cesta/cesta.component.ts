import { Component, OnInit } from '@angular/core';
import { CestaService } from '../../service/cesta.service';
import { Cesta } from '../../models/cesta.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CestamodificarComponent } from '../modals/cestamodificar/cestamodificar.component';

import { MotorService } from '../../service/motor.service';
import { CaballosService } from '../../service/caballos.service';
import { ModeloService } from '../../service/modelo.service';
import { CajaService } from '../../service/caja.service';
import { CarburanteService } from '../../service/carburante.service';
import { TraccionService } from '../../service/traccion.service';
import { CilindradaService } from '../../service/cilindrada.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {
  cestas: Cesta[] = [];
  nuevaCesta: Cesta = {
    id_configuracion: 0,
    id_usuario: 0,
    id_motor: 0,
    id_caballos: 0,
    id_modelo: 0,
    id_caja: 0,
    id_carburante: 0,
    id_traccion: 0,
    id_cilindrada: 0,
    configuracion: '',
    fecha_configuracion: new Date()
  };

  motores: any[] = [];
  caballos: any[] = [];
  modelos: any[] = [];
  cajas: any[] = [];
  carburantes: any[] = [];
  tracciones: any[] = [];
  cilindradas: any[] = [];
  usuarios: any[] = [];

  constructor(
    private modalService: NgbModal,
    private cestaService: CestaService,
    private motorService: MotorService,
    private caballosService: CaballosService,
    private modeloService: ModeloService,
    private cajaService: CajaService,
    private carburanteService: CarburanteService,
    private traccionService: TraccionService,
    private cilindradaService: CilindradaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerCestas();
    this.obtenerMotores();
    this.obtenerCaballos();
    this.obtenerModelos();
    this.obtenerCajas();
    this.obtenerCarburantes();
    this.obtenerTracciones();
    this.obtenerCilindradas();
    this.obtenerUsuarios();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerCestas(): void {
    this.cestaService.getCestas().subscribe((data: Cesta[]) => {
      this.cestas = data;
    }, (error) => {
      console.error('Error al cargar las cestas:', error);
      alert('Error al cargar las cestas. Por favor, intenta nuevamente.');
    });
  }

  obtenerMotores(): void {
    this.motorService.getMotor().subscribe((data: any[]) => {
      this.motores = data;
    }, (error) => {
      console.error('Error al cargar los motores:', error);
      alert('Error al cargar los motores. Por favor, intenta nuevamente.');
    });
  }

  obtenerCaballos(): void {
    this.caballosService.getCaballos().subscribe((data: any[]) => {
      this.caballos = data;
    }, (error) => {
      console.error('Error al cargar los caballos:', error);
      alert('Error al cargar los caballos. Por favor, intenta nuevamente.');
    });
  }

  obtenerModelos(): void {
    this.modeloService.getModelo().subscribe((data: any[]) => {
      this.modelos = data;
    }, (error) => {
      console.error('Error al cargar los modelos:', error);
      alert('Error al cargar los modelos. Por favor, intenta nuevamente.');
    });
  }

  obtenerCajas(): void {
    this.cajaService.getCaja().subscribe((data: any[]) => {
      this.cajas = data;
    }, (error) => {
      console.error('Error al cargar las cajas:', error);
      alert('Error al cargar las cajas. Por favor, intenta nuevamente.');
    });
  }

  obtenerCarburantes(): void {
    this.carburanteService.getCarburante().subscribe((data: any[]) => {
      this.carburantes = data;
    }, (error) => {
      console.error('Error al cargar los carburantes:', error);
      alert('Error al cargar los carburantes. Por favor, intenta nuevamente.');
    });
  }

  obtenerTracciones(): void {
    this.traccionService.getTraccion().subscribe((data: any[]) => {
      this.tracciones = data;
    }, (error) => {
      console.error('Error al cargar las tracciones:', error);
      alert('Error al cargar las tracciones. Por favor, intenta nuevamente.');
    });
  }

  obtenerCilindradas(): void {
    this.cilindradaService.getCilindrada().subscribe((data: any[]) => {
      this.cilindradas = data;
    }, (error) => {
      console.error('Error al cargar las cilindradas:', error);
      alert('Error al cargar las cilindradas. Por favor, intenta nuevamente.');
    });
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    }, (error) => {
      console.error('Error al cargar los usuarios:', error);
      alert('Error al cargar los usuarios. Por favor, intenta nuevamente.');
    });
  }

  crearCesta(): void {
    this.cestaService.addCesta(this.nuevaCesta).subscribe(response => {
      alert('Cesta creada exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear la cesta
      this.obtenerCestas();
    }, (error) => {
      console.error('Error al crear la cesta:', error);
      alert('Hubo un error al registrar la cesta.');
    });
  }

  resetFormulario(): void {
    this.nuevaCesta = {
      id_configuracion: 0,
      id_usuario: 0,
      id_motor: 0,
      id_caballos: 0,
      id_modelo: 0,
      id_caja: 0,
      id_carburante: 0,
      id_traccion: 0,
      id_cilindrada: 0,
      configuracion: '',
      fecha_configuracion: new Date()
    };
  }

  eliminarCesta(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cesta?')) {
      this.cestaService.deleteCesta(id).subscribe(() => {
        this.cestas = this.cestas.filter(cesta => cesta.id_configuracion !== id);
        alert('Cesta eliminada correctamente.');
      }, (error) => {
        console.error('Error al eliminar la cesta:', error);
        alert('No se pudo eliminar la cesta. Intenta nuevamente.');
      });
    }
  }

  irAModificarCesta(cesta: Cesta): void {
    if (!cesta) {
      console.warn('Cesta inválida');
      alert('La cesta seleccionada no es válida para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(CestamodificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.cesta = cesta; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación de la cesta.');
    }
  }

// Métodos para obtener los nombres correspondientes a los IDs
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

obtenerNombreUsuario(id_usuario: number): string {
  const usuario = this.usuarios.find(u => u.id_usuario === id_usuario);
  return usuario ? usuario.nombre : '';
}


}