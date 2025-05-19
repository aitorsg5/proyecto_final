import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuVisible = false; 
  userName = 'Juan Pérez'; 
  userEmail = 'juan.perez@email.com'; 
  constructor(private router: Router) {} 
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  editName() {
    this.router.navigate(['/Perfil']); 
  }

  editEmail() {
    console.log('Poner tu correo');
  }

  logout() {
    console.log('Cerrar sesión');
  }
}
