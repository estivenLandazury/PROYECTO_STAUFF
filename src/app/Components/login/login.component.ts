import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServiciosService } from '../../dataServices/servicios.service';
import { Usuario } from '../../models/usuario';
import { RolUsuario } from '../../models/rolUsuario';

import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email1: string;
  password1: string;
  username: string;
  url: string;
  user: User
  usuario: Usuario
  rolUsuario: RolUsuario[]
  private _subscriptions: Subscription;

  /*http://127.0.0.1:8000/getUsu/?q=Steven&l=Land%C3%A1zury%20Salazar*/

  constructor(private ServiciosService: ServiciosService, private router: Router) { }





  comprobarLogin() {

    this.ServiciosService.getCuenta(this.username).subscribe(
      /** Obtiene la cuenta apartir del nombre de suario de la cuenta */
      result => {
      this.user = result[0]
        if (result[0] == null) {
          alert("verifique la contraseña o nombre de usuario")
          this.username = "",
            this.password1 = ""
        }

      },

      e => { alert("verifique la contraseña o nombre de usuario") },

      () => {

        this.ServiciosService.getUsuarioCuenta(this.user.id).subscribe(
          /** Obtiene el usuario aociada  a la cuenta*/
          result => {
          this.usuario = result[0]

          },

          e => { alert("verifique la contraseña o nombre de usuario") },

          () => {
            this.ServiciosService.getRolUsuario(this.usuario.id).subscribe(
              result => { this.rolUsuario = result },

              e => { alert("verifique") },

              () => {
                for (let i = 0; i < this.rolUsuario.length; i++) {

                  let rol = this.rolUsuario[i].tipoUsuario

                  if (rol === '1' || rol === '2' || rol === '3') {
                    let user = {
                      email: "",
                      username: this.username,
                      password: this.password1
                      /* password: "123"*/
                    }

                    this.ServiciosService.establecerSesioUsuarip(user).subscribe((data: User) => {

                      localStorage.setItem("usuario", JSON.stringify(data));
                      this.router.navigateByUrl('/Admin')
                    },
                      e => { alert("Verifque su contraseña o nombre de usuario") },

                      () => {
                      this.username = "",
                        this.password1 = ""
                      }

                    )

                  } else {
                    alert("la cuenta de usurio, no tiene permisos de acceso a la sesión")
                    this.username = "",
                      this.password1 = ""
                  }

                }


              }
            )

          }


        )
      }


    )

  }



  crearCuentaUsuario() {
    let user = {
      username: "landazury",
      password: "123",
      email: "steven@hotmail.com",


      /* password: "123"*/
    }

    this.ServiciosService.crearCuentaUsuario(user).subscribe((data: User) => {
      localStorage.setItem("usuario", JSON.stringify(data));
      this.router.navigateByUrl('/Admin')
    })


  }


  ngOnInit() {

    /*this.crearCuentaUsuario();*/

  }


}
