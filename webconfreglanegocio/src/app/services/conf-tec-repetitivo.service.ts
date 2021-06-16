import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/common/apiResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfTecRepetitivoService {

  constructor(private httpClient:HttpClient) { }

  url = `${environment.urlApiConfReglasNegocio}conftecnicarepetitivo/`;
  urlValidacion=`${environment.urlApiConfReglasNegocio}conftecnicavalidacion/`;

  Cargar(Id:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(this.url+'cargar?IdConfTecnica=' + Id);
  }

  Guardar(ConfTecnica){
    return this.httpClient.post<ApiResult>(this.url+'guardar',ConfTecnica).toPromise();
  }
  Modificar(ConfTecnica){
    return this.httpClient.post<ApiResult>(this.url+'modifica',ConfTecnica).toPromise();
  }

  CargarValidacion(IdConfTecnica:number,IdDoctoOrigen:number){
    return this.httpClient.get<ApiResult>(`${this.urlValidacion}validar?IdConfTecnica=${IdConfTecnica}&IdDoctoOrigen=${IdDoctoOrigen}`);
  }


}
