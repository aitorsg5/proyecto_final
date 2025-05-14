export class Usuario {
  id_usuario: number;
  nombre: string;
  email: string;
  password: string; // Cambiado a `password`
  estado: 'deshabilitado' | 'activo';
  direccion?: string; // Propiedad opcional
  es_admin: boolean;
  fecha_creacion: Date;

  constructor(
    id_usuario: number,
    nombre: string,
    email: string,
    password: string,
    estado: 'deshabilitado' | 'activo',
    direccion: string | undefined,
    es_admin: boolean,
    fecha_creacion: Date
  ) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.password = password; // Asignamos `password` a la propiedad
    this.estado = estado;
    this.direccion = direccion;
    this.es_admin = es_admin;
    this.fecha_creacion = fecha_creacion;
  }
}
