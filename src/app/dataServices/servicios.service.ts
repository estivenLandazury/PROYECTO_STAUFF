import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { catchError, tap } from 'rxjs/operators';

/*
@Injectable({
  providedIn: 'root'
})
*/
const  httpOptions= {headers: new HttpHeaders({ 'Content-Type': 'application/jason' })};

@Injectable()
export class ServiciosService {

  constructor(private htpp: HttpClient) { }
  
  /*getUsuarios() {
    return this.htpp.get<Usuario[]>('http://localhost:8000/usuario?format=json');
  }*/

  getUsuarios():Observable<Usuario[]>{
    return this.htpp.get<Usuario[]>('http://localhost:8000/usuario');
  }

  
  deleteUsuario(id: number): Observable<Usuario>{
    /* const url ='${"http://localhost:8000/usuario"}/$id';*/
    return this.htpp.delete<Usuario>('http://localhost:8000/usuarios/'+id).pipe(
      tap(_ => console.log(`Se elimino el usuario id=${id}`)),
    );


}
/*updateUser (user: Usuario): Observable<any> {
  return this.htpp.put('http://localhost:8000/usuario',user);
}*/

updateUser (user: Usuario): Observable<any> {
  console.log("este es el servicio update"+ user.Identificador);

  return this.htpp.put('http://localhost:8000/usuarios/'+user.Identificador, user).pipe(
    tap(_ => console.log(`updated  id=${user.Identificador}`)),
  );
   
  
}


añadirUsuario (user: Usuario): Observable<Usuario> {
  return this.htpp.post<Usuario>('http://localhost:8000/usuario', user).pipe(
    tap(_ => console.log(`añadido el usuario  id=${user.Identificador}`)),
   
  );
  
}

actualizarUsuario(identificador:number, nomb:string, apell:string){
  let user:Usuario={
    Identificador:identificador,
    nombre:nomb,
    apellido:apell
  };
  this.updateUser(user).subscribe();

}

añadirNuevoUsuario( identificador:number, nomb:string, apell:string){
  let user:Usuario={
    Identificador:identificador,
    nombre:nomb,
    apellido:apell
  };
  this.añadirUsuario(user).subscribe();
}









/*
  deleteUsuario(id: number): Promise<void> {
    const url = '${"http://localhost:8000/usuario"}/${identificador}';
    return this.htpp.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
  }
*/





  /*
  getUsuarios(): {
   return  this.htpp.get('http://localhost:8000/usuario?format=json');
    
    /*return this.htpp.get('http://localhost:8000/usuario?format=json', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Usuario[])
  } 

*/


}
