import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {Usuario} from '../../models/usuario';
import { ServiciosService } from '../../dataServices/servicios.service';
import { TipoDocumento } from '../../models/tipoDocumento';
import {Encargado} from '../../models/encargado';



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
  encargado: string[]

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
     
    this.ServiciosService.getUsuarioCuenta(this.user.user_id).subscribe((result=>{
      
      for(let i= result.length-1; i>=0; i--){
       
    this.usuario=result[i];
        
        let usu:Usuario={
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        numeroDocumento: this.usuario.numeroDocumento,
        user: this.usuario.user,
        encargado: this.encargado,


        }

        this.numeroDocumento=usu.numeroDocumento;
        this.nombre=usu.nombre;
        this.apellido=usu.apellido;
        this.correo=this.user.email;



      }
    }))
    
  }


  getTipoDocumentos(): void {
    this.ServiciosService.getTipoDocumentos().subscribe((data => this.tipoDocumentos = data));
  }




}
