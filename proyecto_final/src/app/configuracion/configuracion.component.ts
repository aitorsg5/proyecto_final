import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  horsepowerOptions = [100, 150, 200, 300];

  selectedOptions = {
    hp: 150,
    transmission: 'manual',
    fuel: 'gasolina',
    engine: '4cil',
    drive: 'delantera'
  };

  // ✅ Define la URL de la imagen del coche
  carImageUrl = 'assets/fotos/audirs6_1.jpg'; // Asegúrate de tener esta imagen en esa ruta

  buy() {
    console.log('Configuración final:', this.selectedOptions);
  }
}


