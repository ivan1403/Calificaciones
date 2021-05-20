import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefCondService {

  constructor(private httpClient:HttpClient) { }
  url = `${environment.urlApiConfReglasNegocio}reglasrefcond/`;
  Cargar():Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(this.url+'cargar');
  }

  CargarXDescripcion(descripcion:string){
    return this.httpClient.get<ApiResult>(this.url+'cargarXDescripcion?descripcion=' + descripcion);
  }

}
