import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserJwt } from '../models/userJwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthgenService {

  constructor(private httpClient: HttpClient) { }

  genToken(user: UserJwt) {

    let url =`${environment.urlApiConfReglasNegocio}auth/Token`;
    return this.httpClient.post(url, user);
  }
}
