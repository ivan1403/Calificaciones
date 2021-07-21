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
  urlRef = `${environment.urlApiConfReglasNegocio}condicion/`;

  Cargar(rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.url}cargar?rpp=${rpp}&pagina=${pagina}`);
  }

  CargarXDescripcionYEstatus(descripcion:string,estatusEjecucion:number,rpp:number, pagina:number){
    return this.httpClient.get<ApiResult>(`${this.url}cargarXdescripcionyestatus?descripcion=${descripcion}&estatusEjecucion=${estatusEjecucion}&rpp=${rpp}&pagina=${pagina}`);
  }

  CargarRefCondxId(id:number){
    return this.httpClient.get<ApiResult>(this.url+'cargarXId?Id=' + id);
  }

  CargarXFiltro(descripcion:string,rpp:number, pagina:number){
    return this.httpClient.get<ApiResult>(`${this.urlRef}cargarporreglacondicion?ReglaCondicion=${descripcion}&rpp=${rpp}&pagina=${pagina}`);
  }
  
  CargarRedXCond(descripcion:string,rpp:number, pagina:number){
    return this.httpClient.get<ApiResult>(`${this.urlRef}CargarPorReferencia?ReferenciaCondicion=${descripcion}&rpp=${rpp}&pagina=${pagina}`);
  }


}
