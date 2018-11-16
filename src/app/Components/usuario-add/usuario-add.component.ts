import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Encargado } from '../../models/encargado';
import { TipoDocumento } from '../../models/tipoDocumento';
import { TipoUsuario } from '../../models/tipoUsuario';
import { Manilla } from '../../models/manilla';
import { RolUsuario } from '../../models/rolUsuario';

import { ServiciosService } from '../../dataServices/servicios.service';
import { UsuarioDocumento } from '../../models/usuarioDocumento';
import { Howl } from 'howler'

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  identificador: string;
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  fechaNacimiento: Date;
  tipoDocumento1: string;
  tipoUsuario1: string;
  correo: string;
  contrasena: string;


  macid: string;
  nombreDispositivo: string;



  /*Listas */

  encargados: Encargado[]
  tipoDocumentos: TipoDocumento[]
  tipoUsuarios: TipoUsuario[]
  usuarios: Usuario[]
  manillas: Manilla[]

  succesMessage: string;

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

    let user: Usuario = {
      Identificador: this.numeroDocumento,
      nombre: this.nombre,
      apellido: this.apellido,
      numeroDocumento: this.numeroDocumento,
      fechaNacimiento: this.fechaNacimiento


    }
    this.ServiciosService.añadirUsuario(user).subscribe();


    let rol: RolUsuario = {
      usuario: this.numeroDocumento,
      tipoUsuario: this.tipoUsuario1,
    };


    this.ServiciosService.añadirRolUsuario(rol).subscribe();




    let Usdoc: UsuarioDocumento = {
      usuario: this.numeroDocumento,
      tipoDocumento: this.tipoDocumento1
    }


    this.ServiciosService.añadirUsuarioDocumento(Usdoc).subscribe();




    /*this.ServiciosService.añadirNuevoUsuario(this.identificador,this.nombre, this.apellido,this.numeroDocumento,
      this.fechaNacimiento);*/


  }


  addDispositivo() {

    console.log(this.macid)
    console.log(this.nombreDispositivo)

    let dispo: Manilla = {
      macId: this.macid,
      nombre: this.nombreDispositivo
    }

    this.ServiciosService.añadirDispositivo(dispo).subscribe();
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
