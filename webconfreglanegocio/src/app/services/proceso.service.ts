import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(private httpClient:HttpClient) { }

  url = `${environment.urlApiConfReglasNegocio}procesosprogramados/`;
  urlSemanal = `${environment.urlApiConfReglasNegocio}programacionsemanal/`;

  // Cargar(){
  //   return this.httpClient.get(this.url + 'Cargar').toPromise();
  // }
  // Cargar():Promise<ApiResult>
  // {
  //   return this.httpClient.get<ApiResult>(this.url + 'Cargar').toPromise();
  // }
  Cargar():Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(this.url+'cargar');
  }

  CargarXId(Id:number)
  {
    return this.httpClient.get<ApiResult>(this.url+'cargarxid?id='+ Id);
  }

  agregarproceso(proceso){
    return this.httpClient.post<ApiResult>(this.url+'agregarproceso',proceso).toPromise();
  }

  agregarprocesoSemana(procesoSemanal){
    return this.httpClient.post<ApiResult>(this.urlSemanal+'agregarprocesosemanal',procesoSemanal).toPromise();
  }
}
