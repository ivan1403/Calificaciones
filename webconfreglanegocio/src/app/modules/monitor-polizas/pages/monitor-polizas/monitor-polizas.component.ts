import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';

import { ModalSelRepetitivoComponent } from '../../modals/modal-sel-repetitivo/modal-sel-repetitivo.component'
import { ModalSelInfoOrigenComponent } from '../../modals/modal-sel-info-origen/modal-sel-info-origen.component'
import { ModalVerLogComponent } from '../../../../shared/modals/modal-ver-log/modal-ver-log.component'
import { MonitorPolizaService } from '../../../../services/monitor-poliza.service'

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-monitor-polizas',
  templateUrl: './monitor-polizas.component.html',
  styleUrls: ['./monitor-polizas.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class MonitorPolizasComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private toastr: ToastrService,private MonitorPolizaService:MonitorPolizaService) { }

    rpp=10;
    pagina:number;

    monitorPoliza:any;

    InputAsientoRepetitivo;
    SelectEstatus;
    InputDocumento;
    FechaDocumentoInicio;
    FechaDocumentoFinal;
    InputPoliza;
    FechaPolizaInicio;
    FechaPolizaFinal

    idConfTecnica:number;

  ngOnInit(): void {
    this.CargarMonitorPoliza(1)
  }

  abrirModalSelAsientoRepetitivo() {  

    const modalSelAsientoRepetitivoComponent = this.modalService.open(ModalSelRepetitivoComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    modalSelAsientoRepetitivoComponent.componentInstance.evt.subscribe(arg=>{
      //console.log(arg)
      this.CargarAsientoSelected(arg)
    })
    modalSelAsientoRepetitivoComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  abrirModalInfoOrigen() {  

    const modalInfoOrigenComponent = this.modalService.open(ModalSelInfoOrigenComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    
    modalInfoOrigenComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  abrirModalHistorialEjecucion() {  

    const modalInfoOrigenComponent = this.modalService.open(ModalVerLogComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    
    modalInfoOrigenComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  CargarMonitorPoliza(pagina:number){
    this.MonitorPolizaService.Cargar(this.rpp, pagina).subscribe((monitorPoliza:ApiResult)=>{
      if(monitorPoliza.result!=null){
      this.monitorPoliza = monitorPoliza.result; 
      console.log(this.monitorPoliza);
      }
      else{
        this.monitorPoliza=[]
      }
    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }

  CargarAsientoSelected(asiento:any){  
    
      if(asiento.comentario!=undefined){
        this.InputAsientoRepetitivo=asiento.comentario
        this.idConfTecnica=asiento.idConfTecnica
      }
    }

  BuscarPoliza(){
      // this.InputDocumento;
      // this.InputPoliza;
      // this.FechaDocumentoInicio;
      // this.FechaDocumentoFinal;
      // this.FechaPolizaInicio;
      // this.FechaPolizaFinal;
    console.log(this.SelectEstatus)
    }

}
