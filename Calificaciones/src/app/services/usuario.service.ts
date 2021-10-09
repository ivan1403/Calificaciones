import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  usuario: string;
  zona: string;


  init() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    if(token && !helper.isTokenExpired(token))  {

      let tokenUser = helper.decodeToken(token);
      this.usuario = tokenUser.IdUsuario;
      this.zona = tokenUser.Zona;
    }


  }
}
