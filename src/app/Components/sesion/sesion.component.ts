import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioDocumento} from '../../models/usuarioDocumento';

import { ServiciosService } from '../../dataServices/servicios.service';
import { Encargado } from '../../models/encargado';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  encargado:string
  fechaNacimiento: Date;
  user:string;


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



  constructor(private ServiciosService: ServiciosService, private modalService: NgbModal) {

  }

  
  open(content) {
    this.modalService.open(content);
  }


  obtenerUsuario(){

    this.ServiciosService.
    getUsuarioPorIdentificador(this.identificador).subscribe(result=>{
     

        this.usuario=result;
       

    },
      e=> { alert("Error al buscar Usuario")},

         ()=>{
           if(this.usuario===null){
             alert("El usuario Buscado no existe")
           }

          this.ServiciosService.getRolDUsuario(this.usuario.id).subscribe(result=>{
            this.idRolUsuario=result.tipoUsuario
         },
         
         e=>{ alert("Error al buscar tipoRol")},

         ()=>{
          this.encargados=this.usuario.encargado
          this.obtenerEncargdaos()
          this.obtenerNumeroyTipodocumento()

          this.ServiciosService.getTipoUsuario(this.idRolUsuario).subscribe(result=>{

           this.nombreRol=result.nombreRol
           this.nombre=this.usuario.nombre
           this.numeroDocumento= this.usuario.numeroDocumento
           this.nombreDocumento
           this.encargados.length
           this.encargado
          
            alert("El nombre del usuario es "+ this.usuario.nombre+"\n"+
                   "El rol del usuario es "+ this.nombreRol+"\n"+
                   "El tipo documento: "+ this.nombreDocumento+"\n"+
                   "# Documento :" + this.usuario.numeroDocumento+"\n"+
                   "sus encargados son: "+ this.encargados.length+"\n"+
                   "    estos son:"+this.encargado)
                   this.usuario.nombre="";
                   this.nombreRol="";

         },
         
         )
        
        },
         )
        
        }
      )

  }


obtenerEncargdaos(){

  for(let i=0; i<this.encargados.length; i++){
     
    if(this.encargados.length===0){
      this.encargado="no tiene usuarios a su disposicón"
    }


    this.ServiciosService.getUsuarioPorId(this.encargados[i]).subscribe(res=>{
    let cadena= "   " +"nombre: "+res.nombre+ " Apellido: "+res.apellido+ " Número Documento: "+ res.numeroDocumento ;
    this.encargado+=cadena+"\n"  
  },

  

    
    )
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
