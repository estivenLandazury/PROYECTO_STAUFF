import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Encargado } from '../../models/encargado';
import { TipoDocumento } from '../../models/tipoDocumento';
import {TipoUsuario} from '../../models/tipoUsuario';
import { ServiciosService }  from '../../dataServices/servicios.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  identificador: string;
  nombre:string;
  apellido:string;
  numeroDocumento:string;
  fechaNacimiento:Date
  encargado:Encargado[]
  tipoDocumento:TipoDocumento[]
  tipoUsuario: TipoUsuario[]


  succesMessage: string;

  constructor(private ServiciosService: ServiciosService) { 

  }


  getTipoDocumentos(): void {
    this.ServiciosService.getTipoDocumentos().subscribe((data => this.tipoDocumento = data));
  }

  
  getTipoUsuarios(): void {
    this.ServiciosService.getTipoUsuarios().subscribe((data => this.tipoUsuario = data));
  }




 
  addUser() {
    this.ServiciosService.añadirNuevoUsuario(this.identificador,this.nombre, this.apellido,this.numeroDocumento,
      this.fechaNacimiento);
  }
  

  ngOnInit() {

    this.getTipoDocumentos()
    this.getTipoUsuarios()
  }

}
