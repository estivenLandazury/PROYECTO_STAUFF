import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioDocumento} from '../../models/usuarioDocumento';

import { ServiciosService } from '../../dataServices/servicios.service';
import { Encargado } from '../../models/encargado';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {

  usuarios: Usuario[];
  usuario:Usuario;
  usuarioDocumento:UsuarioDocumento

  nombre: string;
  apellido: string;
  identificador:string
  numeroDocumento: string;
  nombreDocumento:string
  tiopoDocumento:string;
  idTipoDocumento:string;
  nombreRol:string;
  idRolUsuario:string;
  encargados: string[]
  encargado:Usuario[];
  fechaNacimiento: Date;
  user:string;
  closeResult: string;

  getUsuarios(): void {
    this.ServiciosService.getUsuarios().subscribe((data => this.usuarios = data));
  }

  delete(e,usuario:Usuario): void {
    this.ServiciosService.deleteUsuario(usuario.numeroDocumento).subscribe();
    this.usuarios = this.usuarios.filter(a => a !== usuario);
    console.log(usuario);
  }


 

  /*
  delete(usu): void{
   this.ServiciosService.deleteUsuario(usu.id);
   this.usuarios = this.usuarios.filter(a=>a !== usu);
 }*/



  constructor(private ServiciosService: ServiciosService,  private modalService: NgbModal, private toastr: ToastrService) {

  }


  error(info:string){
    this.toastr.error('Error', info, {
      timeOut: 3000
    });

  }


  succes(info:string){
    this.toastr.success('SeccesFull', info, {
      timeOut: 3000
    });

  }

  warning(info:string){
    this.toastr.warning('Warning', info, {
      timeOut: 3000
    });

  }

  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

 


  obtenerUsuario(content){

    this.ServiciosService.
    getUsuarioPorIdentificador(this.identificador).subscribe(result=>{
     

        this.usuario=result;
       

    },
      e=> { this.error("Error al buscar Usuario")},

         ()=>{
           if(this.usuario===null){
            this.error("El usuario Buscado no existe")
           }

          this.ServiciosService.getRolDUsuario(this.usuario.id).subscribe(result=>{
            this.idRolUsuario=result.tipoUsuario
         },
         
         e=>{ this.error("Error al buscar tipoRol")},

         ()=>{
          this.encargados=this.usuario.encargado
          this.obtenerNumeroyTipodocumento()
          this.obtenerEncargdaos()

          this.ServiciosService.getTipoUsuario(this.idRolUsuario).subscribe(result=>{


           this.nombreRol=result.nombreRol
           this.nombre=this.usuario.nombre
           this.numeroDocumento= this.usuario.numeroDocumento
           this.nombreDocumento
           this.encargados.length
           this.encargado.length

           this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
         
          });

           
                  

         },

         e=>{},

         ()=>{ }
         
         )
        
        },
         )
        
        }
      )

  }


obtenerEncargdaos(){
  this.encargado=[];

  for(let i=0; i<this.encargados.length; i++){
     
    if(this.encargados.length===0){
    }else{


    this.ServiciosService.getUsuarioPorId(this.encargados[i]).subscribe(res=>{
       this.encargado=[];
     
      this.encargado.push(res)
  },
  e=>{
    console.log("indefinido")
  }
  ,
    
  

    
    )}
  }

  

   
}


obtenerNumeroyTipodocumento(){

this.ServiciosService.getUsuarioDocumento(this.usuario.id).subscribe(result=>{

this.usuarioDocumento=result
if(this.usuarioDocumento===null){
  alert("Error al obtener el usuarioDocuemnto")
}

},

e=>{"No se encuantra el usuarioDocumento"},

()=>{
 this.ServiciosService.getTipoDocumento(this.usuarioDocumento.tipoDocumento).subscribe(res=>{
    
    this.nombreDocumento=res.nombreDocumento
  },
  
  e=>{ alert("Error al obtener el nombre del documento")},

  ()=>{}
  )
}
)


}


  ngOnInit() {
    this.getUsuarios();

   

 

  }


}
