import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificarUsuarioComponent } from '../modals/usuario-modificar/usuario-modificar.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuarioComponent implements OnInit {
  Usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    id_usuario: 0,
    nombre: '',
    email: '',
    password: '',
    estado: 'activo',
    direccion: '',
    es_admin: false,
    fecha_creacion: new Date()
  };

  constructor(private modalService: NgbModal, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.Usuarios = data;
    }, (error) => {
      console.error('Error al cargar los usuarios:', error);
      alert('Error al cargar los usuarios. Por favor, intenta nuevamente.');
    });
  }

  crearUsuario(): void {
    this.usuarioService.addUsuario(this.nuevoUsuario).subscribe(response => {
      alert('Usuario creado exitosamente');
      this.resetFormulario(); // Resetea el formulario después de crear el usuario
      this.obtenerUsuarios();
    }, (error) => {
      console.error('Error al crear usuario:', error);
      alert('Hubo un error al registrar el usuario.');
    });
  }

  cambiarEstado(estado: 'activo' | 'deshabilitado'): void {
    this.nuevoUsuario.estado = estado;
  }

  cambiarRol(rol: boolean): void {
    this.nuevoUsuario.es_admin = rol;
  }

  resetFormulario(): void {
    this.nuevoUsuario = {
      id_usuario: 0,
      nombre: '',
      email: '',
      password: '',
      estado: 'activo',
      direccion: '',
      es_admin: false,
      fecha_creacion: new Date()
    };
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.Usuarios = this.Usuarios.filter(usuario => usuario.id_usuario !== id);
        alert('Usuario eliminado correctamente.');
      }, (error) => {
        console.error('Error al eliminar usuario:', error);
        alert('No se pudo eliminar el usuario. Intenta nuevamente.');
      });
    }
  }

  // Método para abrir el modal de modificación del usuario sin ruta de navegación
  IrAmodificarusuario(usuario: Usuario): void {
    if (!usuario) {
      console.warn('Usuario inválido');
      alert('El usuario seleccionado no es válido para modificar.');
      return;
    }

    try {
      const modalRef = this.modalService.open(ModificarUsuarioComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static' // Evita cerrar el modal al hacer clic fuera de él
      });

      modalRef.componentInstance.usuario = usuario;

      modalRef.result
        .then(() => {
          console.log('Modal cerrado exitosamente.');
        })
        .catch((error) => {
          console.warn('El modal fue cerrado sin cambios.', error);
        });

    } catch (error) {
      console.error('Error al abrir el modal de modificación:', error);
      alert('Hubo un problema al intentar abrir la pantalla de modificación del usuario.');
    }
  }
}
