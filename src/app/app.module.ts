import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Asegúrate de importar NgbModule
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento
import { UsuarioService } from './service/usuario.service';
import { UsuarioComponent } from './admin/usuarios/usuarios.component';
import { MotorComponent } from './admin/motor/motor.component';
import { IndexComponent } from './pagina/index/index.component';
import { MenuComponent } from './admin/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModificarUsuarioComponent } from './admin/modals/usuario-modificar/usuario-modificar.component';
import { MotorModificarComponent } from './admin/modals/motor-modificar/motor-modificar.component';
import { CaballosComponent } from './admin/caballos/caballos.component';
import { CaballosmodificarComponent } from './admin/modals/caballosmodificar/caballosmodificar.component';
import { CilindradaComponent } from './admin/cilindrada/cilindrada.component';
import { CilindradamodificarComponent } from './admin/modals/cilindradamodificar/cilindradamodificar.component';
import { CajaComponent } from './admin/caja/caja.component';
import { CajamodificarComponent } from './admin/modals/cajamodificar/cajamodificar.component';
import { CarburanteComponent } from './admin/carburante/carburante.component';
import { CarburantemodificarComponent } from './admin/modals/carburantemodificar/carburantemodificar.component';
import { ModeloComponent } from './admin/modelo/modelo.component';
import { ModeloModificarComponent } from './admin/modals/modelomodificar/modelomodificar.component';
import { TraccionModificarComponent } from './admin/modals/traccionmodificar/traccionmodificar.component';
import { TraccionComponent } from './admin/traccion/traccion.component';
import { CocheComponent } from './admin/coche/coche.component';
import { CocheModificarComponent } from './admin/modals/coche-modificar/coche-modificar.component';
import { CestaComponent } from './admin/cesta/cesta.component';
import { CestamodificarComponent } from './admin/modals/cestamodificar/cestamodificar.component';
import { PedidoComponent } from './admin/pedido/pedido.component';
import { PedidomodificarComponent } from './admin/modals/pedidomodificar/pedidomodificar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsuarioComponent,
    MotorComponent,
    IndexComponent,
    MenuComponent,
    ModificarUsuarioComponent,
    MotorModificarComponent,
    CaballosComponent,
    CaballosmodificarComponent,
    CilindradaComponent,
    CilindradamodificarComponent,
    CajaComponent,
    CajamodificarComponent,
    CarburanteComponent,
    CarburantemodificarComponent,
    ModeloComponent,
    ModeloModificarComponent,
    TraccionModificarComponent,
    TraccionComponent,
    CocheComponent,
    CocheModificarComponent,
    CestaComponent,
    CestamodificarComponent,
    PedidoComponent,
    PedidomodificarComponent,
    HeaderComponent,
    FooterComponent,
    ListaDeCochesComponent,
    ConfiguracionComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Añadir FormsModule a las importaciones
    MatMenuModule, // Importa MatMenuModule
    MatButtonModule, BrowserAnimationsModule, // Importa MatButtonModule
    NgbModule, // Importa el módulo de ng-bootstrap
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule



  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
