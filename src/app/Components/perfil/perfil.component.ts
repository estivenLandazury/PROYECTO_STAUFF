import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {Usuario} from '../../models/usuario';
import { ServiciosService } from '../../dataServices/servicios.service';
import { TipoDocumento } from '../../models/tipoDocumento';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
;
  user:User
  usuario: Usuario
  tipoDocumentos: TipoDocumento[]
  tipodcoumento1: string;
  numeroDocumento:string;
  nombre:string;
  apellido:string;
  correo:string;
  fechaNacimiento:Date;

  encontrado:boolean

  constructor(private ServiciosService: ServiciosService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("usuario"));
    this.obtenerusuario();
    this.getTipoDocumentos();
  }


     
    /*
  this.ServiciosService.getAlarmas().subscribe((result =>
    {
      this.valorEstado=result.length;
      
     or(let i= result.length-1; i>=0; i--){
      console.log(result[1].descripcion+"   información de manillas")
 
     }
     
    })) */

  obtenerusuario(){
     
    console.log(
    this.ServiciosService.getUsuarioCuenta("1").subscribe((result=>{
      
      for(let i= result.length-1; i>=0; i--){
       console.log( result[i]);
       
    this.usuario=result[i];
        
        let usu:Usuario={
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        numeroDocumento: this.usuario.numeroDocumento,
        fechaNacimiento: this.usuario.fechaNacimiento,
        user: this.usuario.user,


        }

        this.numeroDocumento=usu.numeroDocumento;
        this.nombre=usu.nombre;
        this.apellido=usu.apellido;
        this.correo=this.user.email;
        this.fechaNacimiento=usu.fechaNacimiento;

        console.log("El perfil del usuario es "+ usu.nombre+ " "+ usu.user)


      }
    }))
    )
  }


  getTipoDocumentos(): void {
    this.ServiciosService.getTipoDocumentos().subscribe((data => this.tipoDocumentos = data));
  }




}
