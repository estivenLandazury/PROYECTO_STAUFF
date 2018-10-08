import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './Components/login/login.component';
import { SesionComponent } from './Components/sesion/sesion.component';
import { UsuarioAddComponent } from './Components/usuario-add/usuario-add.component';
import {UpdateUsersComponent} from './Components/update-users/update-users.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'sesion', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent },
    { path: 'Sesion', component: SesionComponent },
    { path: 'Añadir_Usuario', component: UsuarioAddComponent},
    { path: 'Actualizar_Usuario', component: UpdateUsersComponent},
    
    { path: '**', redirectTo: 'sesion' }

    /*{
        path: 'Sesion', children: [
            {
                path: '',
                component: SesionComponent
            },
            {
                path: 'add',
                component: UsuarioAddComponent
            }
        ]
    },*/


    /*{
          path: 'Sesion', component: SesionComponent, children: [{
              path: 'Login', component: LoginComponent
  
          }]
      },*/

];


@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutedComponents: any[] = [

];