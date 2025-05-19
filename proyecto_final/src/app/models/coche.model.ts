export class Coche {
      id_coche: number;
      precio: number;
      imagen: string;
      descripcion: string;
      fecha_de_fabricacion: Date;
      id_motor: number;
      id_caballos: number;
      id_modelo: number;
      id_caja: number;
      id_carburante: number;
      id_traccion: number;
      id_cilindrada: number;
    
      constructor(
        id_coche: number,
        precio: number,
        imagen: string,
        descripcion: string,
        fecha_de_fabricacion: Date,
        id_motor: number,
        id_caballos: number,
        id_modelo: number,
        id_caja: number,
        id_carburante: number,
        id_traccion: number,
        id_cilindrada: number
      ) {
        this.id_coche = id_coche;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.fecha_de_fabricacion = fecha_de_fabricacion;
        this.id_motor = id_motor;
        this.id_caballos = id_caballos;
        this.id_modelo = id_modelo;
        this.id_caja = id_caja;
        this.id_carburante = id_carburante;
        this.id_traccion = id_traccion;
        this.id_cilindrada = id_cilindrada;
      }
    }
    