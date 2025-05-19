export class Usuario {
  nombre: string;
  email: string;
  password: string; // Cambiado a `password`


  constructor(
    nombre: string,
    email: string,
    password: string,

  ) {
    this.nombre = nombre;
    this.email = email;
    this.password = password; // Asignamos `password` a la propiedad

  }
}
