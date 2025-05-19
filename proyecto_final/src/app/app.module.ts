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
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListaDeCochesComponent } from './lista-de-coches/lista-de-coches.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PerfilDeUsuarioComponent } from './perfil-de-usuario/perfil-de-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ListaDeCochesComponent,
    ConfiguracionComponent,
    PerfilDeUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
