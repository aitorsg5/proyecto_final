import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuVisible = false; // Controla la visibilidad del menú desplegable
  userName = 'Juan Pérez'; // Nombre del usuario (esto sería dinámico en un caso real)
  userEmail = 'juan.perez@email.com'; // Correo del usuario (esto también sería dinámico)

  // Función para alternar la visibilidad del menú
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Funciones para las opciones del menú
  editName() {
    console.log('Poner tu nombre');
  }

  editEmail() {
    console.log('Poner tu correo');
  }

  logout() {
    console.log('Cerrar sesión');
    // Aquí podrías redirigir o hacer la lógica de logout
  }
}
