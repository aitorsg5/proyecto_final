import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../service/usuario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './usuario-modificar.component.html',
  styleUrls: ['./usuario-modificar.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {
  @Input() usuario: Usuario | null = null; // Usuario recibido desde el componente padre.
  @Output() onSave = new EventEmitter<Usuario>(); // Emite el usuario modificado.
  @Output() onClose = new EventEmitter<void>(); // Emite un evento para cerrar el modal.

  originalUsuario: Usuario | null = null; // Copia del usuario original para restaurar si se cancela.

  constructor(public activeModal: NgbActiveModal, private usuariosService: UsuarioService) {}

  ngOnInit(): void {
    if (this.usuario) {
      // Crear una copia profunda del usuario original
      this.originalUsuario = JSON.parse(JSON.stringify(this.usuario));
    }
  }

  cambiarEstado(event: Event): void {
    if (this.usuario) {
      const checkbox = event.target as HTMLInputElement;
      this.usuario.estado = checkbox.checked ? 'activo' : 'deshabilitado';
    }
  }

  cambiarRol(event: Event): void {
    if (this.usuario) {
      const checkbox = event.target as HTMLInputElement;
      this.usuario.es_admin = checkbox.checked;
    }
  }

  guardarCambios(): void {
    if (this.usuario && this.usuario.id_usuario) {
      this.usuariosService.updateUsuario(this.usuario.id_usuario, this.usuario).subscribe(
        (response: Usuario) => {
          console.log('Usuario actualizado:', response);
          alert('Cambios guardados exitosamente.');
          this.activeModal.close(response); // Cierra el modal y envía el resultado
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('No se pudo actualizar el usuario. Intenta nuevamente.');
        }
      );
    } else {
      alert('No hay datos para guardar.');
    }
  }

  cerrarModal(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios se revertirán.')) {
      if (this.originalUsuario && this.usuario) {
        // Restaurar los datos originales
        this.usuario.nombre = this.originalUsuario.nombre;
        this.usuario.email = this.originalUsuario.email;
        this.usuario.estado = this.originalUsuario.estado;
        this.usuario.es_admin = this.originalUsuario.es_admin;
        this.usuario.password = this.originalUsuario.password;
        this.usuario.fecha_creacion = this.originalUsuario.fecha_creacion;
      }
      this.activeModal.close(); // Cerrar el modal
    }
  }
}
