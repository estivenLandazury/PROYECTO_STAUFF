import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServiciosService } from '../../dataServices/servicios.service';
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
  private _subscriptions: Subscription;

  /*http://127.0.0.1:8000/getUsu/?q=Steven&l=Land%C3%A1zury%20Salazar*/

  constructor(private ServiciosService: ServiciosService, private router: Router) { }



  verificarSesionUsuario() {
    let user = {
      email: "",
      username: this.username,
      password: this.password1
      /* password: "123"*/
    }

    /**almaceno el usuario en una variable para hacer uso de el en la sesión */
    this.ServiciosService.establecerSesioUsuarip(user).subscribe((data: User) => {
      
      localStorage.setItem("usuario", JSON.stringify(data));
      this.router.navigateByUrl('/Admin')
    },
    e=>{ alert("Verifque su contraseña o nombre de usuario")},

    )

    this.username="",
    this.password1=""



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
