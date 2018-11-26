import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  
})
export class AdminComponent implements OnInit {

  user: User;
  private interval: any;
  constructor(private router:Router) { }

  ngOnInit() {

    this.router.navigateByUrl('/Admin/(home:Perfil)')
    this.user = JSON.parse(localStorage.getItem("usuario"));
    /*this.cargarIntervalo();*/
  }

  cargarIntervalo() {
    let segundo = 0;
    this.interval = setInterval(() => {
      console.log("Segundo: "+ segundo);
      segundo++;
    }, 1000);
  }



  devolverLogin(){
    localStorage.removeItem("usuario");
    console.log("se bajó el usuario de sesión")
   this.router.navigateByUrl('/Login');
    console.log("se bajó el usuario de sesión")
    
    
  }

}
