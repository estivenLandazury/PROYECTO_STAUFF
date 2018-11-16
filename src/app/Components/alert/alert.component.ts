import { Component, OnInit, Input, OnChanges,SimpleChanges} from '@angular/core';
import { ServiciosService } from '../../dataServices/servicios.service';
import {Alarma} from '../../models/alarma';
import { Observable } from 'rxjs';
import { Howl } from 'howler'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnChanges {
  
  
  

  @Input() estadoAlarma: Alarma[];
  
  constructor(private ServiciosService: ServiciosService) { 


  }

  ngOnInit() {

   
    /*
  this.ServiciosService.getAlarmas().subscribe((result =>
    {
      this.valorEstado=result.length;
      
     or(let i= result.length-1; i>=0; i--){
      console.log(result[1].descripcion+"   información de manillas")
 
     }
     
    })) */
  
    this.ServiciosService.getAlarmas().subscribe((data=>this.estadoAlarma=data));
    var sound = new Howl({
     src: ['../../../assets/BOMB_SIREN-BOMB_SIREN-247265934.wav'],
     html5: true
   });
   sound.play();
   

  }



  ngOnChanges(changes: SimpleChanges): void {

    for( let propName in changes){
      let change= changes[propName]
      let curval = JSON.stringify(change.currentValue);
      let preVal= JSON.stringify(change.previousValue);

      console.log(curval)
      console.log(preVal);
    }
    this.ServiciosService.getAlarmas().subscribe((data=>this.estadoAlarma=data));
    var sound = new Howl({
     src: ['../../../assets/BOMB_SIREN-BOMB_SIREN-247265934.wav'],
     html5: true
   });
   sound.play();
   
 
  }


 

}
