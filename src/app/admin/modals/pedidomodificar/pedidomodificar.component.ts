import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../service/pedido.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CestaService } from '../../../service/cesta.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-pedidomodificar',
  templateUrl: './pedidomodificar.component.html',
  styleUrls: ['./pedidomodificar.component.scss']
})
export class PedidomodificarComponent implements OnInit {
  @Input() pedido: Pedido | null = null;
  @Output() onSave = new EventEmitter<Pedido>();
  @Output() onClose = new EventEmitter<void>();
  originalPedido: Pedido | null = null;

  nuevasCestas: any[] = [];
  usuarios: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private pedidoService: PedidoService,
    private cestaService: CestaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    if (this.pedido) {
      this.originalPedido = JSON.parse(JSON.stringify(this.pedido));
    }
    this.obtenerCestas();
    this.obtenerUsuarios();
  }

  obtenerCestas(): void {
    this.cestaService.getCestas().subscribe((data: any[]) => {
      this.nuevasCestas = data;
    }, (error) => {
      console.error('Error al cargar las cestas:', error);
      alert('Error al cargar las cestas. Por favor, intenta nuevamente.');
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

  guardarCambios(): void {
    if (this.pedido && this.pedido.id_pedido) {
      this.pedidoService.updatePedido(this.pedido.id_pedido, this.pedido).subscribe(
        (response: Pedido) => {
          console.log('Pedido actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar pedido:', error);
          alert('No se pudo actualizar el pedido. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalPedido && this.pedido) {
        // Restaurar los datos originales
        this.pedido = JSON.parse(JSON.stringify(this.originalPedido));
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }

  obtenerNombreCesta(id_configuracion_cesta: number): string {
    const cesta = this.nuevasCestas.find(c => c.id_configuracion === id_configuracion_cesta);
    return cesta ? cesta.configuracion : '';
  }

  obtenerNombreUsuario(id_usuario: number): string {
    const usuario = this.usuarios.find(u => u.id_usuario === id_usuario);
    return usuario ? usuario.nombre : '';
  }
}
