export class Pedido {
      id_pedido: number;
      id_configuracion_cesta: number;
      id_usuario: number;
      fecha_pedido: Date;
      estado: string;
    
      constructor(
        id_pedido: number,
        id_configuracion_cesta: number,
        id_usuario: number,
        fecha_pedido: Date,
        estado: string
      ) {
        this.id_pedido = id_pedido;
        this.id_configuracion_cesta = id_configuracion_cesta;
        this.id_usuario = id_usuario;
        this.fecha_pedido = fecha_pedido;
        this.estado = estado;
      }
    }
    