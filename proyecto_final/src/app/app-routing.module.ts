import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { AdminGuard } from './service/admin.guard'; // Importa el guardia de ruta
import { IndexComponent } from './pagina/index/index.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';


import { PerfilDeUsuarioComponent } from './perfil-de-usuario/perfil-de-usuario.component';

import { ConfiguracionComponent } from './configuracion/configuracion.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent },
  { path: 'coches', component: ListaDeCochesComponent },
  { path: 'Configuracion', component: ConfiguracionComponent },
  { path: 'Perfil', component: PerfilDeUsuarioComponent },
 // { path: 'usuarios', component: UsuarioComponent, canActivate: [AdminGuard] }, // Añade el guardia de ruta aquí










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
