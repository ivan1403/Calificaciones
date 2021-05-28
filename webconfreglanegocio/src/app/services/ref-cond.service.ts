import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { identity, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefCondService {

  constructor(private httpClient:HttpClient) { }
  url = `${environment.urlApiConfReglasNegocio}reglasrefcond/`;
  Cargar(rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?rpp=${rpp}&pagina=${pagina}`);
  }

  CargarXDescripcion(descripcion:string,rpp:number, pagina:number){
    return this.httpClient.get<ApiResult>(`${this.url}cargarXDescripcion?descripcion=${descripcion}&rpp=${rpp}&pagina=${pagina}`);
  }

  CargarRefCondxId(id:number){
    return this.httpClient.get<ApiResult>(this.url+'cargarXId?Id=' + id);
  }


}
