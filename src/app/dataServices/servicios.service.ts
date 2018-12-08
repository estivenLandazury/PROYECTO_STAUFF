import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { TipoDocumento } from '../models/tipoDocumento';
import { TipoUsuario } from '../models/tipoUsuario';
import { Manilla } from '../models/manilla';

import { UsuarioDocumento } from '../models/usuarioDocumento';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { promise } from 'protractor';
import { catchError, tap } from 'rxjs/operators';
import { RolUsuario } from '../models/rolUsuario';
import { Alarma } from '../models/alarma';
import { Encargado } from '../models/encargado';
import { ManillaUsuario } from '../models/manillaUsuario';

/*
@Injectable({
  providedIn: 'root'
})
*/
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const CONEXION = "http://192.168.0.21:8080/";

@Injectable()
export class ServiciosService {

  constructor(private htpp: HttpClient) { }

  /*getUsuarios() {
    return this.htpp.get<Usuario[]>('http://localhost:8000/usuario?format=json');
    http://127.0.0.1:8000/getUsu/?q=Steven&l=Land%C3%A1zury%20Salazar

  }*/


  getUsuarios(): Observable<Usuario[]> {
    return this.htpp.get<Usuario[]>(CONEXION + 'usuariosSecundarios');
  }


  getUsuario(nombre: string, apellido: string): Observable<Usuario[]> {
    return this.htpp.get<Usuario[]>(CONEXION + 'getUsu/?q=' + nombre + "&l=" + apellido);
  }

  getUsuarioPorIdentificador(identificador: string): Observable<Usuario> {
    return this.htpp.get<Usuario>(CONEXION + 'usuario/' + identificador);
  }

  getUsuarioPorId(identificador: string): Observable<Usuario> {
    return this.htpp.get<Usuario>(CONEXION + 'usuarioId/' + identificador);
  }

  /* obtiene un usuario a partir del id la cuenta creada*/
  getUsuarioCuenta(user: String): Observable<Usuario[]> {
    return this.htpp.get<Usuario[]>(CONEXION + 'prueba/?q=' + user);
  }

  /*Obtiene una lista el  rol del usuario a partir del id del usuario*/
  getRolUsuario(idUsuario: string): Observable<RolUsuario[]> {
    return this.htpp.get<RolUsuario[]>(CONEXION + 'rolIdUsuario/?q=' + idUsuario);
  }

  /*Obtiene el  rol del usuario a partir del id del usuario*/
  getRolDUsuario(idUsuario: string): Observable<RolUsuario> {
    return this.htpp.get<RolUsuario>(CONEXION + 'rolUsuario/' + idUsuario);
  }


  /**obtiene el la relación usuario docuemnto apartir del id del usuario */
  getUsuarioDocumento(idUser: string): Observable<UsuarioDocumento> {
    return this.htpp.get<UsuarioDocumento>(CONEXION + 'UsuarioDocumento/' + idUser);

  }


  /*Obtiene una cuenta a partir del userName*/
  getCuenta(userName: String): Observable<User[]> {
    return this.htpp.get<User[]>(CONEXION + 'GetCuenta/?q=' + userName);
  }



  getTipoDocumentos(): Observable<TipoDocumento[]> {
    return this.htpp.get<TipoDocumento[]>(CONEXION + 'Tipodocumentos');
  }


  getTipoDocumento(idTipo: string): Observable<TipoDocumento> {
    return this.htpp.get<TipoDocumento>(CONEXION + 'TipoDocumento/' + idTipo);
  }


  getTipoUsuarios(): Observable<TipoUsuario[]> {
    return this.htpp.get<TipoUsuario[]>(CONEXION + 'filterTipoUsuario');
  }

  getTipoUsuario(idTipo: string): Observable<TipoUsuario> {
    return this.htpp.get<TipoUsuario>(CONEXION + 'tipoUsuario/' + idTipo);
  }

  getManillas(): Observable<Manilla[]> {
    return this.htpp.get<Manilla[]>(CONEXION + 'Manillas');
  }

  getAlarmas(): Observable<Alarma[]> {
    return this.htpp.get<Alarma[]>(CONEXION + 'Alarmas');
  }


  getAlarmasResueltas(): Observable<Alarma[]> {
    return this.htpp.get<Alarma[]>(CONEXION + 'AlarmasTrue');
  }

  getAlarmasSinTerminar(): Observable<Alarma[]> {
    return this.htpp.get<Alarma[]>(CONEXION + 'AlarmasFalse');
  }











  deleteUsuario(id: string): Observable<Usuario> {
    return this.htpp.delete<Usuario>(CONEXION + 'usuario/' + id).pipe(
      tap(_ => console.log(`Se elimino el usuario id=${id}`)),
    );


  }
  /*updateUser (user: Usuario): Observable<any> {
    return this.htpp.put('http://localhost:8000/usuario',user);
  }*/

  updateUser(user: Usuario): Observable<any> {
    console.log("este es el servicio update" + user.id);

    return this.htpp.put(CONEXION + 'usuario/' + user.id, user).pipe(
      tap(_ => console.log(`updated  id=${user.id}`)),
    );


  }



  establecerSesioUsuarip(user): Observable<User> {
    let url = CONEXION + 'Autenticade';
    return this.htpp.post<User>(url, user, httpOptions);
  }

  crearCuentaUsuario(user): Observable<User> {
    let url = CONEXION + 'AddUser';
    return this.htpp.post<User>(url, user, httpOptions);

  }






  añadirRolUsuario(rol: RolUsuario): Observable<RolUsuario> {
    return this.htpp.post<RolUsuario>(CONEXION + 'rolUsuarios', rol)

  }

  añadirDispositivo(dis: Manilla): Observable<Manilla> {
    return this.htpp.post<Manilla>(CONEXION + 'Manillas', dis)
  }

  añadirUsuarioDocumento(UsDoc: UsuarioDocumento): Observable<UsuarioDocumento> {
    return this.htpp.post<UsuarioDocumento>(CONEXION + 'UsuarioDocumentos', UsDoc)

  }

  añadirUsuario(user: Usuario): Observable<Usuario> {
    console.log("añadido el usuario con id: " + user.id)
    return this.htpp.post<Usuario>(CONEXION + 'usuarios', user)

  }

  añadirEncargado(encargado: Encargado): Observable<Encargado> {

    return this.htpp.post<Encargado>(CONEXION + 'Encargados', encargado)

  }


  añadirManillasUusario(manillasUs: ManillaUsuario): Observable<ManillaUsuario> {
    return this.htpp.post<ManillaUsuario>(CONEXION + 'ManillaUsuarios', manillasUs)

  }


  actualizarUsuario(identificador: string, nomb: string, apell: string, numeroDoc: string,  users: User, encargao: string[]) {
    let usuario: Usuario = {
      id: identificador,
      nombre: nomb,
      apellido: apell,
      numeroDocumento: numeroDoc,
      user: users,
      encargado: encargao

    };
    this.updateUser(usuario).subscribe();

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
