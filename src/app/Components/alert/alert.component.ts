import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServiciosService } from '../../dataServices/servicios.service';
import { Alarma } from '../../models/alarma';
import { Observable } from 'rxjs';
import { Howl } from 'howler'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  valorDefaul: Number;
  private interval: any;
  alarma: Alarma;
  value: number
  val = 0;
  evaluado:boolean
  valAnterior: Array<number> = new Array();
  alarmas: Alarma[]
  alrmasResultas:Alarma[]
  alrmasNoResultas:Alarma[]


  totalAlarmasResueltas: number;
  totalAlarmasSinResolver: number;
  todasLasAlarmas:number;
  AlrmasActuales:number;





  constructor(private ServiciosService: ServiciosService) {


  }

  



  ngOnInit() {
   /* this.cargarIntervalo()*/
   this.obtenerALarmas()
   this.obtenerAlarmasResueltas()
   this.obtenerAlrmasSinTerminar()
  }


obtenerALarmas(){
  this.ServiciosService.getAlarmas().subscribe(result=>{

    this.alarmas=result;
    this.todasLasAlarmas=this.alarmas.length


  })

}


obtenerAlarmasResueltas(){
  this.ServiciosService.getAlarmasResueltas().subscribe(result=>{
    
    this.alrmasResultas=result;
    this.totalAlarmasResueltas=this.alrmasResultas.length


    this.alarmas=this.alrmasResultas
  })

}


obtenerAlrmasSinTerminar(){
  this.ServiciosService.getAlarmasSinTerminar().subscribe(result=>{
    this.totalAlarmasSinResolver=result.length
    this.alrmasNoResultas=result;
    this.alarmas=this.alrmasNoResultas
  

  })
}









}





