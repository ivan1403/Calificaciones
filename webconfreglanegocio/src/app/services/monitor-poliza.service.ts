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

  Cargar(rpp:number, pagina:number, idConfTecnica, documento:string, poliza:string, fechaDoctoInicio:string,
     fechaDoctoFinal:string, fechaPolizaInicio:string, fechaPolizaFinal:string, estatusTransaccion,procesoTransaccion):Observable<ApiResult>
  {
    
    return this.httpClient.get<ApiResult>(`${this.url}CargarFiltrado?rpp=${rpp}&pagina=${pagina}&idConfTecnica=${idConfTecnica}&documento=${documento}&poliza=${poliza}&fechaDoctoInicio=${fechaDoctoInicio}&fechaDoctoFinal=${fechaDoctoFinal}&fechaPolizaInicio=${fechaPolizaInicio}&fechaPolizaFinal=${fechaPolizaFinal}&estatusTransaccion=${estatusTransaccion}&procesoTransaccion=${procesoTransaccion}`);
  }

  CargarAsientosRepetitivos(descripcion:string, rpp:number, pagina:number):Observable<ApiResult>
  {
    return this.httpClient.get<ApiResult>(`${this.urlasiento}cargarconfXdescripcion?descripcion=${descripcion}&rpp=${rpp}&pagina=${pagina}`);
  }

  CargarHistorial(rpp:number, pagina:number, idTransaccionPrePoliza, fechaInicio, fechaFinal):Observable<ApiResult>
 {
  if(fechaInicio==undefined || fechaInicio==null){fechaInicio='' } 
  if(fechaFinal==undefined || fechaFinal==null){fechaFinal='' } 
   
   return this.httpClient.get<ApiResult>(`${this.url}CargarHistorial?rpp=${rpp}&pagina=${pagina}&idTransaccionPrePoliza=${idTransaccionPrePoliza}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
 }

 GenerarPolizaSeleccionada(idsTransacciones){
   //console.log(dsTransacciones)
  return this.httpClient.post<ApiResult>(this.url+'generarpolizaseleccionada', idsTransacciones).toPromise();
}
  

}
