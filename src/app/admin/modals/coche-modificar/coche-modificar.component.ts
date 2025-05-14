import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Coche } from '../../../models/coche.model';
import { CocheService } from '../../../service/coche.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MotorService } from '../../../service/motor.service';
import { CaballosService } from '../../../service/caballos.service';
import { ModeloService } from '../../../service/modelo.service';
import { CajaService } from '../../../service/caja.service';
import { CarburanteService } from '../../../service/carburante.service';
import { TraccionService } from '../../../service/traccion.service';
import { CilindradaService } from '../../../service/cilindrada.service';

import { Motor } from '../../../models/motor.model';
import { Caballos } from '../../../models/caballos.model';
import { Modelo } from '../../../models/modelo.model';
import { Caja } from '../../../models/caja.model';
import { Carburante } from '../../../models/carburante.model';
import { Traccion } from '../../../models/traccion.model';
import { Cilindrada } from '../../../models/cilindrada.model';




@Component({
  selector: 'app-coche-modificar',
  templateUrl: './coche-modificar.component.html',
  styleUrls: ['./coche-modificar.component.scss']
})
export class CocheModificarComponent implements OnInit {
  @Input() coche: Coche | null = null;
  @Output() onSave = new EventEmitter<Coche>();
  @Output() onClose = new EventEmitter<void>();

  motores: Motor[] = [];
  caballos: Caballos[] = [];
  modelos: Modelo[] = [];
  cajas: Caja[] = [];
  carburantes: Carburante[] = [];
  tracciones: Traccion[] = [];
  cilindradas: Cilindrada[] = [];
  originalCoche: Coche | null = null;

  constructor(
    public activeModal: NgbActiveModal,
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
    if (this.coche) {
      this.originalCoche = JSON.parse(JSON.stringify(this.coche));
    }
    this.obtenerMotores();
    this.obtenerCaballos();
    this.obtenerModelos();
    this.obtenerCajas();
    this.obtenerCarburantes();
    this.obtenerTracciones();
    this.obtenerCilindradas();
  }

  obtenerMotores(): void {
    this.motorService.getMotor().subscribe((data: Motor[]) => {
      this.motores = data;
    });
  }

  obtenerCaballos(): void {
    this.caballosService.getCaballos().subscribe((data: Caballos[]) => {
      this.caballos = data;
    });
  }

  obtenerModelos(): void {
    this.modeloService.getModelo().subscribe((data: Modelo[]) => {
      this.modelos = data;
    });
  }

  obtenerCajas(): void {
    this.cajaService.getCaja().subscribe((data: Caja[]) => {
      this.cajas = data;
    });
  }

  obtenerCarburantes(): void {
    this.carburanteService.getCarburante().subscribe((data: Carburante[]) => {
      this.carburantes = data;
    });
  }

  obtenerTracciones(): void {
    this.traccionService.getTraccion().subscribe((data: Traccion[]) => {
      this.tracciones = data;
    });
  }

  obtenerCilindradas(): void {
    this.cilindradaService.getCilindrada().subscribe((data: Cilindrada[]) => {
      this.cilindradas = data;
    });
  }

  guardarCambios(): void {
    if (this.coche && this.coche.id_coche) {
      this.cocheService.updateCoche(this.coche.id_coche, this.coche).subscribe(
        (response: Coche) => {
          console.log('Coche actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar Coche:', error);
          alert('No se pudo actualizar el Coche. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalCoche && this.coche) {
        // Restaurar los datos originales
        this.coche = JSON.parse(JSON.stringify(this.originalCoche));
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
}
