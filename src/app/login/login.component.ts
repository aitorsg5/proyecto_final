import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  Usuarios: Usuario[] = [];
  usuarioInput: string = '';
  passwordInput: string = '';
  isMuted: boolean = true; // Variable para mantener el estado de mute

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.llenarData();
  }

  ngAfterViewInit(): void {
    this.setupVideo();
  }

  setupVideo(): void {
    const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('myVideo');
    if (video) {
      video.muted = this.isMuted;
      video.play().catch(error => {
        console.error("Error attempting to play the video:", error);
      });

      video.addEventListener('click', () => {
        this.toggleMute(video);
      });
    }
  }

  toggleMute(video: HTMLVideoElement): void {
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  llenarData(): void {
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.Usuarios = data;
      console.log(this.Usuarios);
    });
  }

  verificarCredenciales(): void {
    const usuarioEncontrado = this.Usuarios.find(usuario =>
      usuario.email === this.usuarioInput && usuario.password === this.passwordInput
    );

    if (usuarioEncontrado) {
      this.authService.login(usuarioEncontrado);
      if (usuarioEncontrado.es_admin) {
        alert('Eres admin');
        this.irAadmin();
      } else {
        alert('Correcto');
        this.irAindex();
      }
      console.log('Login correcto', usuarioEncontrado);
    } else if (!this.usuarioInput || !this.passwordInput) {
      alert('Por favor, complete todos los campos.');
    } else {
      alert('Incorrecto');
      console.log('Credenciales incorrectas', this.usuarioInput, this.passwordInput);
    }
  }

  irARegistro(): void {
    this.router.navigate(['/register']);
  }

  irAadmin(): void {
    this.router.navigate(['/usuarios']);
  }

  irAindex(): void {
    this.router.navigate(['/index']);
  }
}
