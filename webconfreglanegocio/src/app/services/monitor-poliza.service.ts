import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorPolizaService {

  constructor(private httpClient:HttpClient) { }

  url = `${environment.urlApiConfReglasNegocio}monitortransaccionprepoliza/`;
  urlasiento = `${environment.urlApiConfReglasNegocio}conftecnica/`;

  Cargar( rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?rpp=${rpp}&pagina=${pagina}`);
  }

  CargarAsientosRepetitivos(descripcion:string, rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.urlasiento}cargarconfXdescripcion?descripcion=${descripcion}&rpp=${rpp}&pagina=${pagina}`);
  }


}
