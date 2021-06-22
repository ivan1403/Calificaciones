import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';
import { PaginadorFiltros } from "../models/common/paginadorFiltros";

@Injectable({
  providedIn: 'root'
})
export class ConftecnicaService {

  constructor(private httpClient:HttpClient) { }

  url = `${environment.urlApiConfReglasNegocio}conftecnica/`;

  Cargar( rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?rpp=${rpp}&pagina=${pagina}`);
  }
  CargarXCondicion(IdCondicion:number, rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?IdCondicion=${IdCondicion}&rpp=${rpp}&pagina=${pagina}`);
  }

  CargarConfTecnica(Id:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(this.url+'cargarconftecnica?IdConfTecnica=' + Id);
  }

  Modifica(confTecnica){
    return this.httpClient.post<ApiResult>(this.url+'modifica',confTecnica).toPromise();
  }
  
  Guardar(ConfTecnica){
    return this.httpClient.post<ApiResult>(this.url+'guardar',ConfTecnica).toPromise();
  }

}
