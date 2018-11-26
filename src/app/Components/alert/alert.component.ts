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
export class AlertComponent implements OnInit, OnChanges {

  valorDefaul: Number;
  private interval: any;
  alarma: Alarma;
  value: number
  val = 0;
  evaluado:boolean
  valAnterior: Array<number> = new Array();
  estadoAlarma: Alarma[]




  constructor(private ServiciosService: ServiciosService) {


  }

  cargarIntervalo() {
    this.interval = setInterval(() => {
      this.ServiciosService.getAlarmas().subscribe(
        x => {
          this.value = x.length
          this.propagaciónAlarma(this.value)
          console.log(x.length + " " + this.value)
        },
        e => alert("Erro al registrar usuario"),
        () => console.log("ddf")


      )
    }, 30000);
  }



  ngOnInit() {
    this.cargarIntervalo()
  }


  propagaciónAlarma(valorLista: number) {
    this.val = valorLista;
    
    console.log("evaluado antes del if "+ this.evaluado)
    if (!this.valAnterior.includes(this.val)) {
     this.evaluado=false
      console.log("evaluado  dentro if "+ this.evaluado)

      this.valAnterior.push(this.val)
    }

    
    if (this.valAnterior.length > 1 && !this.evaluado) {
      console.log(this.valAnterior.length+" >1 && evaluado= " +this.evaluado)
      let position = this.valAnterior.length-2;

      let compare = this.valAnterior[position]
      console.log("compare "+compare +"&& val= "+ this.val)
      this.evaluado=true


      if (compare < this.val) {
        console.log("evaluado siendo evaluado "+ this.evaluado)

        var sound = new Howl({
          src: ['../../../assets/BOMB_SIREN-BOMB_SIREN-247265934.wav'],
          html5: true
        });
        sound.play();


      }


    } 


  }


  ngOnChanges(changes: SimpleChanges): void {

    for (let propName in changes) {
      let change = changes[propName]
      let curval = JSON.stringify(change.currentValue);
      let preVal = JSON.stringify(change.previousValue);

      console.log("lansasldkdk")
      console.log(preVal);
    }


  }




}





