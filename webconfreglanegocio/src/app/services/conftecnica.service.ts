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
  
}
