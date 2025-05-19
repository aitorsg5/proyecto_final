export class Cesta {
      id_configuracion: number;
      id_usuario: number;
      id_motor: number;
      id_caballos: number;
      id_modelo: number;
      id_caja: number;
      id_carburante: number;
      id_traccion: number;
      id_cilindrada: number;
      configuracion: string;
      fecha_configuracion: Date;
    
      constructor(
        id_configuracion: number,
        id_usuario: number,
        id_motor: number,
        id_caballos: number,
        id_modelo: number,
        id_caja: number,
        id_carburante: number,
        id_traccion: number,
        id_cilindrada: number,
        configuracion: string,
        fecha_configuracion: Date
      ) {
        this.id_configuracion = id_configuracion;
        this.id_usuario = id_usuario;
        this.id_motor = id_motor;
        this.id_caballos = id_caballos;
        this.id_modelo = id_modelo;
        this.id_caja = id_caja;
        this.id_carburante = id_carburante;
        this.id_traccion = id_traccion;
        this.id_cilindrada = id_cilindrada;
        this.configuracion = configuracion;
        this.fecha_configuracion = fecha_configuracion;
      }
    }
    