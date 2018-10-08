import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../dataServices/usuario';
import { ServiciosService }  from '../../dataServices/servicios.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {


  identificador: number;
  nombre:string;
  apellido:string;
 
  constructor(private ServiciosService: ServiciosService) { 


  }

  updateUser(){
    this.ServiciosService.actualizarUsuario(this.identificador,this.nombre, this.apellido);

  }

  ngOnInit() {
  }

}
