import { Injectable } from '@angular/core';
// Importamos modulos necesarios
import {from, Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import{global} from './GLOBAL';
import{ Usuario }from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
//creamos Variable para URL
public url:any;
public usuario:any;

// Constructor de la clase
  constructor(private http:HttpClient) { 
    this.url=global.url;

    this.usuario=new Usuario('','','',0,'','','',false);
  }
  // Metodo para hacer login
  login(usuario:Usuario, getToken=true):Observable<any>{
    //Variable que almacena los datos del usuario

    let json=usuario;
    if (!getToken) {

    } else {
      usuario.getToken=true;
    }
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'login',json,{headers:headers});
  }

  // Metodos para obtener el token
  getToken(){}

  // Metodo para los datos del usuario
  getIdeltity(){}
}
