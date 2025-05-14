import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './admin/usuarios/usuarios.component'; // Asegúrate de importar el componente
import { AdminGuard } from './service/admin.guard'; // Importa el guardia de ruta
import { IndexComponent } from './pagina/index/index.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';

import { MotorComponent } from './admin/motor/motor.component';
import { CaballosComponent } from './admin/caballos/caballos.component';
import { CilindradaComponent } from './admin/cilindrada/cilindrada.component';
import { CajaComponent } from './admin/caja/caja.component';

import { CarburanteComponent } from './admin/carburante/carburante.component';

import { ModeloComponent } from './admin/modelo/modelo.component';
import { TraccionComponent } from './admin/traccion/traccion.component';
import { CocheComponent } from './admin/coche/coche.component';
import { CestaComponent } from './admin/cesta/cesta.component';

import { PedidoComponent } from './admin/pedido/pedido.component';

import { ConfiguracionComponent } from './configuracion/configuracion.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent },
  { path: 'coches', component: ListaDeCochesComponent },
  { path: 'Configuracion', component: ConfiguracionComponent },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AdminGuard] }, // Añade el guardia de ruta aquí
  { path: 'motor', component: MotorComponent },
  { path: 'caballos', component: CaballosComponent },
  { path: 'cilindrada', component: CilindradaComponent },
  { path: 'Caja', component: CajaComponent },
  { path: 'Carburante', component: CarburanteComponent },
  { path: 'modelo', component: ModeloComponent },
  { path: 'traccion', component: TraccionComponent },
  { path: 'coche', component: CocheComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'pedido', component: PedidoComponent }









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
