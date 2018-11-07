import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ServiciosService } from '../../dataServices/servicios.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  usuarios: Usuario[];


  getUsuarios(): void {
    this.ServiciosService.getUsuarios().subscribe((data => this.usuarios = data));
  }

  delete(e,usuario:Usuario): void {
    this.ServiciosService.deleteUsuario(usuario.Identificador).subscribe();
    this.usuarios = this.usuarios.filter(a => a !== usuario);
    console.log(usuario);
  }


 

  /*
  delete(usu): void{
   this.ServiciosService.deleteUsuario(usu.id);
   this.usuarios = this.usuarios.filter(a=>a !== usu);
 }*/



  constructor(private ServiciosService: ServiciosService) {

  }

  ngOnInit() {
    this.getUsuarios();
  }

}
