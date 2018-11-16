import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RoutedComponents } from './app-routing.module';
import { SesionComponent } from './Components/sesion/sesion.component';
import {ServiciosService} from './dataServices/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import {Http, HttpModule } from '@angular/http';
import { UsuarioAddComponent } from './Components/usuario-add/usuario-add.component';
import { UpdateUsersComponent } from './Components/update-users/update-users.component';
import { AdminComponent } from './Components/admin/admin.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { AlertComponent } from './Components/alert/alert.component';
import { AuthGuard } from './Components/auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoutedComponents,
    SesionComponent,
    UsuarioAddComponent,
    UpdateUsersComponent,
    AdminComponent,
    PerfilComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule, 
    MatSidenavModule
    
  ],
  providers: [ServiciosService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
