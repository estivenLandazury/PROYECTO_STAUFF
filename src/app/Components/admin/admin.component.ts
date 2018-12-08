import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Alarma } from '../../models/alarma';
import { ServiciosService } from '../../dataServices/servicios.service';
import { Howl } from 'howler'



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  
})
export class AdminComponent implements OnInit {

  user: User;
  private interval: any;

  valorDefaul: Number;
  alarma: Alarma;
  value: number
  val = 0;
  evaluado:boolean
  valAnterior: Array<number> = new Array();
  estadoAlarma: Alarma[]


  constructor(private router:Router,private ServiciosService: ServiciosService) { }



  public cargarIntervalo():void {
    this.interval = setInterval(() => {
      this.ServiciosService.getAlarmas().subscribe(
        x => {
          this.value = x.length
          this.propagaciónAlarma(this.value)
          console.log(x.length + " " + this.value)
        },
        e => alert("Erro al propagar alarma"),
        () => console.log("ddf")


      )
    }, 15000);
  }



  ngOnInit() {
    this.router.navigateByUrl('/Admin/(home:Perfil)')
    this.user = JSON.parse(localStorage.getItem("usuario"));
    this.cargarIntervalo()

    /*this.cargarIntervalo();*/
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



  devolverLogin(){
    localStorage.removeItem("usuario");
    console.log("se bajó el usuario de sesión")
   this.router.navigateByUrl('/Login');
    console.log("se bajó el usuario de sesión")
    
    
  }

}
