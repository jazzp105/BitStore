import { logging } from 'protractor';

import { Component, OnInit } from '@angular/core';
// Importamos modullos necesiarios
import{Usuario} from '../../../models/usuario';
import{UsuarioService} from 'src/app/services/usuario.service';
import{Route}from '@angular/compiler/src/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variable usuario
  public usuario;

  constructor(private usuarioService:UsuarioService) { 
    this.usuario=new Usuario('','','',0,'','','',false);
  }

  ngOnInit(): void {}

  login(loginForm:any){
    if (!loginForm.valid) {
      console.log('Faltan datos obligatorios');
    } else {
      this.usuarioService.login(this.usuario).subscribe(
        (response)=>{
          console.log(response);
        },
        (error)=>{
          console.log('Error del response ',error)
        }
      );
    }
  }

}
