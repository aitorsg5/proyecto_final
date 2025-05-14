import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidomodificarComponent } from '../modals/pedidomodificar/pedidomodificar.component';
import { CestaService } from '../../service/cesta.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  nuevasCestas: any[] = [];
  usuarios: any[] = [];
  nuevoPedido: Pedido = {
    id_pedido: 0,
    id_configuracion_cesta: 0,
    id_usuario: 0,
    fecha_pedido: new Date(),
    estado: 'pendiente'
  };

  constructor(
    private modalService: NgbModal,
    private pedidoService: PedidoService,
    private cestaService: CestaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerPedidos();
    this.obtenerCestas();
    this.obtenerUsuarios();
    document.body.style.backgroundColor = 'rgb(33, 37, 41)';
  }

  obtenerPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    }, (error) => {
      console.error('Error al cargar los pedidos:', error);
      alert('Error al cargar los pedidos. Por favor, intenta nuevamente.');
    });
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

  crearPedido(): void {
    this.pedidoService.addPedido(this.nuevoPedido).subscribe(response => {
      alert('Pedido creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el pedido
      this.obtenerPedidos();
    }, (error) => {
      console.error('Error al crear el pedido:', error);
      alert('Hubo un error al registrar el pedido.');
    });
  }

  resetFormulario(): void {
    this.nuevoPedido = {
      id_pedido: 0,
      id_configuracion_cesta: 0,
      id_usuario: 0,
      fecha_pedido: new Date(),
      estado: 'pendiente'
    };
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe(() => {
        this.pedidos = this.pedidos.filter(pedido => pedido.id_pedido !== id);
        alert('Pedido eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar el pedido:', error);
        alert('No se pudo eliminar el pedido. Intenta nuevamente.');
      });
    }
  }

  irAModificarPedido(pedido: Pedido): void {
    if (!pedido) {
      console.warn('Pedido inválido');
      alert('El pedido seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(PedidomodificarComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.pedido = pedido; // Asegúrate de usar la propiedad correcta

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación del pedido.');
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
