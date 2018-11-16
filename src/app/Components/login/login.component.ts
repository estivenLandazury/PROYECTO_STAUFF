import { Component, OnInit } from '@angular/core';

import { ServiciosService } from '../../dataServices/servicios.service';

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


  constructor(private ServiciosService: ServiciosService, private router: Router) { }



  verificarSesionUsuario() {
    let user = {
      email: "landa@hotmail.com",
      username: this.username,
      password: this.password1
      /* password: "123"*/
    }
    this.url = '/Admin';
    this.ServiciosService.establecerSesioUsuarip(user).subscribe((data: User) => {
      localStorage.setItem("usuario", JSON.stringify(data));
      this.router.navigate(['/Admin'])
    })


  }

  ngOnInit() {

  }

}
