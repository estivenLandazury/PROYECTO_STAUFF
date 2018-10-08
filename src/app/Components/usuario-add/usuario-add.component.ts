import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../dataServices/usuario';
import { ServiciosService }  from '../../dataServices/servicios.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {


  identificador: number;
  nombre:string;
  apellido:string;

  constructor(private ServiciosService: ServiciosService) { 

    

  }


 
  addUser() {
    this.ServiciosService.añadirNuevoUsuario(this.identificador,this.nombre, this.apellido);

  }

  ngOnInit() {
  }

}
