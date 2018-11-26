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
  usuario:Usuario;

  nombre: string;
  apellido: string;
  numeroDocumento: string;
  fechaNacimiento: Date;
  user:string


  getUsuarios(): void {
    this.ServiciosService.getUsuarios().subscribe((data => this.usuarios = data));
  }

  delete(e,usuario:Usuario): void {
    this.ServiciosService.deleteUsuario(usuario.id).subscribe();
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


  obtenerUsuario(){

    this.ServiciosService.getUsuario(this.nombre, this.apellido).subscribe(result=>{
     
      for(let i= result.length-1; i>=0; i--){
        let user=result[i];

          console.log(user.apellido)
          
          alert("Nombre del usaurio: " +user.nombre+"/n"+ "Apellido: "+ user.apellido)
   
       }

    },
      e=>  alert("Error al buscar Usuario"),


      )

  }




  ngOnInit() {
    this.getUsuarios();
    this.obtenerUsuario();

   

 

  }


}
