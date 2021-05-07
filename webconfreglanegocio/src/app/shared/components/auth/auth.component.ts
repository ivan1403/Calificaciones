import { Component, OnInit } from '@angular/core';
import { UserJwt } from '../../../models/userJwt'
import { AuthgenService } from '../../..//services/authgen.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { Paginador } from '../../../models/common/paginador';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-auth',
  template: ''
})
export class AuthComponent implements OnInit {
  UserJwt: UserJwt = new  UserJwt();
  error: string;
  pagina: String;
  //pUsuario :string;
  //pZona: string;
//http://localhost:4200/auth?pUsuario=01000&pzona=01&pForma=polizas/nueva
  constructor(
    private authService: AuthgenService,
    private router: Router,
    public rutaActiva: ActivatedRoute,
    public usuarioService: UsuarioService
  ) {
    this.UserJwt = new UserJwt();
    
    //this.UserJwt.IdUsuario = this.rutaActiva.snapshot.params.user;
    //this.UserJwt.Zona = this.rutaActiva.snapshot.params.zone;

    //if (!this.UserJwt.IdUsuario){
      this.rutaActiva.queryParams.subscribe(params=>{

        this.UserJwt.IdUsuario = params.pUsuario;
        this.UserJwt.Zona = params.pZona;
        this.pagina = params.pForma;
        this.genToken();
      });
    //}
  }

  ngOnInit(): void {

    //const jwtHelper = new JwtHelperService();
    //const token = localStorage.getItem('token');
    //if (token === null || jwtHelper.isTokenExpired(token)) {
      //this.genToken();
    // }
    // const route = this.modulo + (this.componente ? '/' + this.componente : '');
    // this.router.navigate([route]);
  }

  genToken(): void {
    this.authService.genToken(this.UserJwt).subscribe((result: any) => {
      if (result.error != null) {
        this.error = result.error;
      }
      else {
        // almacenar jwt
        localStorage.setItem('token', result.token);
        // redirecciona al módulo indicado
        this.usuarioService.init();
        this.router.navigate([this.pagina]);
      }
    }, error => {
      console.log('tronó');
    });
  }
}
