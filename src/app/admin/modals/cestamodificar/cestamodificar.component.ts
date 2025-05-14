import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Cesta } from '../../../models/cesta.model';
import { CestaService } from '../../../service/cesta.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MotorService } from '../../../service/motor.service';
import { CaballosService } from '../../../service/caballos.service';
import { ModeloService } from '../../../service/modelo.service';
import { CajaService } from '../../../service/caja.service';
import { CarburanteService } from '../../../service/carburante.service';
import { TraccionService } from '../../../service/traccion.service';
import { CilindradaService } from '../../../service/cilindrada.service';
import { UsuarioService } from '../../../service/usuario.service';

import { Motor } from '../../../models/motor.model';
import { Caballos } from '../../../models/caballos.model';
import { Modelo } from '../../../models/modelo.model';
import { Caja } from '../../../models/caja.model';
import { Carburante } from '../../../models/carburante.model';
import { Traccion } from '../../../models/traccion.model';
import { Cilindrada } from '../../../models/cilindrada.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-cestamodificar',
  templateUrl: './cestamodificar.component.html',
  styleUrls: ['./cestamodificar.component.scss']
})
export class CestamodificarComponent implements OnInit {
  @Input() cesta: Cesta | null = null;
  @Output() onSave = new EventEmitter<Cesta>();
  @Output() onClose = new EventEmitter<void>();
  originalCesta: Cesta | null = null;

  motores: Motor[] = [];
  caballos: Caballos[] = [];
  modelos: Modelo[] = [];
  cajas: Caja[] = [];
  carburantes: Carburante[] = [];
  tracciones: Traccion[] = [];
  cilindradas: Cilindrada[] = [];
  usuarios: Usuario[] = [];

  constructor(
    public activeModal: NgbActiveModal,
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
    if (this.cesta) {
      this.originalCesta = JSON.parse(JSON.stringify(this.cesta));
    }
    this.obtenerMotores();
    this.obtenerCaballos();
    this.obtenerModelos();
    this.obtenerCajas();
    this.obtenerCarburantes();
    this.obtenerTracciones();
    this.obtenerCilindradas();
    this.obtenerUsuarios();
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

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    }, (error) => {
      console.error('Error al cargar los usuarios:', error);
      alert('Error al cargar los usuarios. Por favor, intenta nuevamente.');
    });
  }

  guardarCambios(): void {
    if (this.cesta && this.cesta.id_configuracion) {
      this.cestaService.updateCesta(this.cesta.id_configuracion, this.cesta).subscribe(
        (response: Cesta) => {
          console.log('Cesta actualizada:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar cesta:', error);
          alert('No se pudo actualizar la cesta. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalCesta && this.cesta) {
        // Restaurar los datos originales
        this.cesta = JSON.parse(JSON.stringify(this.originalCesta));
      }
      this.activeModal.close(); // Cerrar el modal
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

  obtenerNombreUsuario(id_usuario: number): string {
    const usuario = this.usuarios.find(u => u.id_usuario === id_usuario);
    return usuario ? usuario.nombre : '';
  }
}
