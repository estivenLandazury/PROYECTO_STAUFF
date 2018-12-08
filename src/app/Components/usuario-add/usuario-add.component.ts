import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Encargado } from '../../models/encargado';
import { TipoDocumento } from '../../models/tipoDocumento';
import { TipoUsuario } from '../../models/tipoUsuario';
import { Manilla } from '../../models/manilla';
import { RolUsuario } from '../../models/rolUsuario';

import { ServiciosService } from '../../dataServices/servicios.service';
import { UsuarioDocumento } from '../../models/usuarioDocumento';
import {User} from '../../models/user';
import {AlertsModule, AlertsService} from 'angular-alert-module';
import { Howl } from 'howler'
import { ManillaUsuario } from '../../models/manillaUsuario';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  fechaNacimiento: Date;
  tipoDocumento1: string;
  tipoUsuario1: string;
  correo: string;
  contrasena: string;
  users: User;

  succesMessage:string

  rol:RolUsuario;
  today:number= Date.now();


  usuarioEncargadoDe:string
  usuarioEncargadoPor:string

  macid: string;
  nombreDispositivo: string;

  /**asociar manilla */
  usuarioManilla:string
  manillaId:string
/**---------------------- */

  /*Listas */

  encargados: Encargado[]
  tipoDocumentos: TipoDocumento[]
  tipoUsuarios: TipoUsuario[]
  usuarios: Usuario[]
  manillas: Manilla[]
  usu:Usuario


  constructor(private ServiciosService: ServiciosService) {

  }



  getTipoDocumentos(): void {
    this.ServiciosService.getTipoDocumentos().subscribe((data => this.tipoDocumentos = data));
  }


  getTipoUsuarios(): void {
    this.ServiciosService.getTipoUsuarios().subscribe((data => this.tipoUsuarios = data));
  }


  getUsuarios(): void {
    this.ServiciosService.getUsuarios().subscribe((data => this.usuarios = data));
  }

  getManillas(): void {
    this.ServiciosService.getManillas().subscribe((data => this.manillas = data));
  }

  addUser() {
    /*** Rol Usuariio */

    
    let usuario: Usuario = {
      id: "",
      nombre: this.nombre,
      apellido: this.apellido,
      numeroDocumento: this.numeroDocumento,
      user:this.users,
      encargado:null
      
    }
    this.usu=usuario;
    this.ServiciosService.añadirUsuario(this.usu).subscribe(
      x=> {alert("se registro el usuario correctamente")},
      e=> alert("Verifque que los campos esten diligeniados correctamente"),
      ()=> this.addRolUsuario()

    );


  }


  resetValores(){
  this.nombre ="";
  this.apellido= "";
  this.numeroDocumento= "";
  this.fechaNacimiento= null;
  this.tipoDocumento1="";
  this.tipoUsuario1="";

  }

  addRolUsuario(){

    this.ServiciosService.getUsuario(this.usu.nombre, this.usu.apellido).subscribe(result=>{

    for(let i=0; i< result.length; i++){

      this.usu=result[i];
      console.log("El rol usuarios del usuario es : "+this.usu.id)
      let rol: RolUsuario = {
        usuario: this.usu.id,
        tipoUsuario: this.tipoUsuario1,
      };
      console.log("el id del usuario a agrega es"+rol.usuario+"  el tipo usuario es :"+ rol.tipoUsuario)
  
  
      this.ServiciosService.añadirRolUsuario(rol).subscribe();
      let usd:UsuarioDocumento={
        usuario: this.usu.id,
        tipoDocumento:this.tipoDocumento1

      }
      this.ServiciosService.añadirUsuarioDocumento(usd).subscribe()


    }
    },
    
    
    e=> {},
    ()=>{this.resetValores()},
    )
    
  
    

  }


   

  


  addUsuarioDocumento(){
    let Usdoc: UsuarioDocumento = {
      usuario: this.usu.id,
      tipoDocumento: this.tipoDocumento1
    }
    this.ServiciosService.añadirUsuarioDocumento(Usdoc).subscribe();


  }





  addDispositivo() {

    console.log(this.macid)
    console.log(this.nombreDispositivo)

    let dispo: Manilla = {
      macId: this.macid,
      nombre: this.nombreDispositivo
    }

    this.ServiciosService.añadirDispositivo(dispo).subscribe(resul=>{

    },
    
    e=>{alert("Error Al añadir Dispositivo")
    this.macid="",
    this.nombre="";},

    ()=>{ 
      alert("Has a ñadido un dispositivo correctamente")
      this.macid="",
      this.nombreDispositivo="";
    }
    );
  }

 asociarUsuarios(){

  let encargado:Encargado={
    id:"",
    idEncargado: this.usuarioEncargadoDe,
    idUsuario:this.usuarioEncargadoPor
  }
this.ServiciosService.añadirEncargado(encargado).subscribe(result=>{


}, 

e=>{ alert("Error al asociar los usuarios")},
()=>{alert("Se han asociado los usuarios exitosoamente")})
 }




 asociarDispositivo(){


  let manillaUsuario: ManillaUsuario={
   id:"",
   usuario:this.usuarioManilla,
   manilla: this.manillaId
  }

  this.ServiciosService.añadirManillasUusario(manillaUsuario).subscribe(result=>{

  
  },
  e=>{ alert("Error al asociar la manilla")},

  ()=>{alert("Has asociado la manilla correctamente al usuario")

}


  )



 }
  ngOnInit() {

    this.getTipoDocumentos()
    this.getTipoUsuarios()
    this.getUsuarios()
    this.getManillas()

    /*var sound = new Howl({
      src: ['../../../assets/BOMB_SIREN-BOMB_SIREN-247265934.wav'],
      html5: true
    });
    sound.play();
    */


  }

}
