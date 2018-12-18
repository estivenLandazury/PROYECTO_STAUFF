import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServiciosService } from '../../dataServices/servicios.service';
import { Alarma } from '../../models/alarma';
import { Usuario } from '../../models/usuario';
import { UsuarioApp } from '../../models/usuarioApp';
import { Encargado } from '../../models/encargado';
import { ModalDismissReasons, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Howl } from 'howler'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {

  valorDefaul: Number;
  private interval: any;
  alarma: Alarma;
  value: number
  val = 0;
  evaluado: boolean
  valAnterior: Array<number> = new Array();
  alarmas: Alarma[]
  alrmasResultas: Alarma[]
  alrmasNoResultas: Alarma[]
  date = new Date();
  tipoAlarma:string
  tipoAlrma1:String

  usuarioApp: UsuarioApp
  Encargado: Encargado

  usuarios: Usuario[]

  usuarioEncargado: Usuario;
  usuariPediatrico: Usuario;

  totalAlarmasResueltas: number;
  totalAlarmasSinResolver: number;
  todasLasAlarmas: number;

  AlrmasActuales: number;

  public modalRef: BsModalRef;
  descripcion:string;
  estadoALrma:string;
  estado:boolean







  constructor(private ServiciosService: ServiciosService, private modalServices: BsModalService, private toastr: ToastrService, private modalService: NgbModal) {


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
    });}

ActualizarAlarma(alarma:Alarma){
  this.estado=true;
  if(this.descripcion===undefined){
  
this.warning("debe ingresar una descripción asociada a la alarma") 
    }else{
if(this.estadoALrma===undefined){
         this.estado=false;
      }        
     alarma.solucionado=this.estado
     alarma.descripcion=this.descripcion
      

         this.ServiciosService.updateAlarma(alarma,alarma.id).subscribe(result=>{
                  this.succes("se actualizó el estado de la alarma")
         },  
         e=>{
         this.error("Error al actualizar alarma")},
         );
    }
    }
    



  public openModal(template) {
    this.modalRef = this.modalServices.show(template); // {3}
  }


  dettalleAlarma(idAlarma: string, templa) {

    this.ServiciosService.getUsuarioAppPorIdAlarma(idAlarma).subscribe(result => {

      this.usuarioApp = result;
      ;
    },
    e => {
      },
      () => {
        this.ServiciosService.getUsuarioEncargadoPrIdEncargado(this.usuarioApp.usuario).subscribe(res => {

          this.Encargado = res;
        },
          e => { },
          () => {
            this.ServiciosService.getUsuarioPorId(this.Encargado.idEncargado).subscribe(resu => {
              this.usuarioEncargado = resu;
            },
              e => { },

              () => {
                this.ServiciosService.getUsuarioPorId(this.Encargado.idUsuario).subscribe(result => {
                  this.usuariPediatrico = result;
                  this.usuarios = []
                  this.usuarios.push(this.usuarioEncargado)
                  this.usuarios.push(this.usuariPediatrico)
                },
                  e => { },
                  () => {

                    this.modalRef = this.modalServices.show(templa);
                  })
              }

            )
          }
        )
      }
    );
  }





  ngOnInit() {
    /* this.cargarIntervalo()*/
    this.obtenerALarmas()
    this.obtenerAlarmasResueltas()
    this.obtenerAlrmasSinTerminar()
  }


  obtenerALarmas() {
    this.ServiciosService.getAlarmas().subscribe(result => {

      this.alarmas = result;
      this.todasLasAlarmas = this.alarmas.length
      this.tipoAlrma1="Total"
      this.tipoAlarma=""


    })

  }


  obtenerAlarmasResueltas() {
    this.ServiciosService.getAlarmasResueltas().subscribe(result => {

      this.alrmasResultas = result;
      this.totalAlarmasResueltas = this.alrmasResultas.length
      this.tipoAlarma="Resueltas"
      this.tipoAlrma1=""


      this.alarmas = this.alrmasResultas
    })

  }


  obtenerAlrmasSinTerminar() {
    this.ServiciosService.getAlarmasSinTerminar().subscribe(result => {
      this.totalAlarmasSinResolver = result.length
      this.alrmasNoResultas = result;
      this.alarmas = this.alrmasNoResultas
      this.tipoAlarma="Sin Resolver"
      this.tipoAlrma1=""




    })
  }









}





