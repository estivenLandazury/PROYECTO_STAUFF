import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './Components/login/login.component';
import { SesionComponent } from './Components/sesion/sesion.component';
import { UsuarioAddComponent } from './Components/usuario-add/usuario-add.component';
import { UpdateUsersComponent } from './Components/update-users/update-users.component';
import { AdminComponent } from './Components/admin/admin.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { AlertComponent } from './Components/alert/alert.component';
import { AuthGuard } from './Components/auth/auth.guard';


const APP_ROUTES: Routes = [
    { path: 'Login', component: LoginComponent },
    { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], children: [
        { path: 'Sesion', component: SesionComponent, outlet: "home" },
        { path: 'Añadir_Usuario', component: UsuarioAddComponent, outlet: "home" },
        { path: 'Actualizar_Usuario', component: UpdateUsersComponent, outlet: "home" },
        { path: 'Perfil', component: PerfilComponent, outlet: "home" },
        { path: 'Alerta', component: AlertComponent, outlet: "home" },]
    },
    { path: '', pathMatch: 'full', redirectTo: 'Login' },



    /*
        {
            path: 'Sesion', component: SesionComponent,
            children: [
                { path: 'Añadir_Usuario', component: UsuarioAddComponent },
                { path: 'Actualizar_Usuario', component: UpdateUsersComponent },
    
            ]
        },
    */

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