import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Encargado } from '../../models/encargado';
import {User} from '../../models/user'
import { ServiciosService }  from '../../dataServices/servicios.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {


  identificador: string;
  nombre:string;
  apellido:string;
  numeroDocumento:string;
  fechaNacimiento:Date
  encargado:string[]
  user:User
 
  constructor(private ServiciosService: ServiciosService) { 


  }

  updateUser(){
    this.ServiciosService.actualizarUsuario(this.identificador,this.nombre, this.apellido,this.numeroDocumento,
    this.user, this.encargado);

  }

  ngOnInit() {
  }

}
