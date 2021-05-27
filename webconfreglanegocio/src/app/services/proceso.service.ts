import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';
import { PaginadorFiltros } from "../models/common/paginadorFiltros";

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(private httpClient:HttpClient) { }

  url = `${environment.urlApiConfReglasNegocio}procesosprogramados/`;
  urlSemanal = `${environment.urlApiConfReglasNegocio}programacionsemanal/`;

  Cargar( rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?rpp=${rpp}&pagina=${pagina}`);
  }

  CargarXId(Id:number,rpp:number, pagina:number)
  {
   // return this.httpClient.get<ApiResult>(this.url+'cargarxid?id='+ Id);
    return this.httpClient.get<ApiResult>(`${this.url}cargarxid?id=${Id}&rpp=${rpp}&pagina=${pagina}`);
  }

  CargarDatosEditar(Id:number):Promise<ApiResult>{
    return this.httpClient.get<ApiResult>(`${this.url}cargardatoseditar?id=${Id}`).toPromise();
  }

  CargarDatosEditarSemanal(Id:number):Promise<ApiResult>{
    return this.httpClient.get<ApiResult>(`${this.urlSemanal}cargardatoseditarsemanal?id=${Id}`).toPromise();
  }

  agregarproceso(proceso){
    return this.httpClient.post<ApiResult>(this.url+'agregarproceso',proceso).toPromise();
  }

  ModificarProceso(proceso){
    return this.httpClient.post<ApiResult>(this.url+'modificarproceso',proceso).toPromise();
  }

}
