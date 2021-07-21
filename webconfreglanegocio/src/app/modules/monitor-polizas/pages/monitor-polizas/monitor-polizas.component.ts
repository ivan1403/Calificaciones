import { Component, Injectable, OnInit ,ViewEncapsulation} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';

import { ModalSelRepetitivoComponent } from '../../modals/modal-sel-repetitivo/modal-sel-repetitivo.component'
import { ModalInfoOrigenComponent } from '../../modals/modal-info-origen/modal-info-origen.component'
import { ModalHistorialEjecucionComponent } from '../../../../modules/monitor-polizas/modals/modal-historial-ejecucion/modal-historial-ejecucion.component'
import { MonitorPolizaService } from '../../../../services/monitor-poliza.service'
import { DatePipe } from '@angular/common';
import { Paginador } from '../../../../models/common/paginador';
import { MonitorPoliza } from '../../../../models/monitorPoliza';
import { environment } from '../../../../../environments/environment';


enum meses {
  Enero,
  Febrero,
  Marzo,
  Abril,
  Mayo,
  Junio,
  Julio,
  Agosto,
  Septiembre,
  Octubre,
  Noviembre,
  Diciembre
}

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
    return date ? date.day + this.DELIMITER + meses[date.month-1] + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-monitor-polizas',
  templateUrl: './monitor-polizas.component.html',
  styleUrls: ['./monitor-polizas.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MonitorPolizasComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private toastr: ToastrService,private MonitorPolizaService:MonitorPolizaService) { }

    paginador = new Paginador()
    paginadorFiltrado = new Paginador()
    rpp=10;
    pagina:number;
    busquedaFiltrada:boolean=false;    

    monitorPoliza:Array<MonitorPoliza>=[];
    busquedaMonitorPoliza:any=[]
    
    InputAsientoRepetitivo;
    SelectEstatus;
    InputDocumento;
    FechaDocumentoInicio;
    FechaDocumentoFinal;
    InputPoliza;
    FechaPolizaInicio;
    FechaPolizaFinal;
    SelectProceso;

    idConfTecnica:number;

    busquedaValida:boolean;
    FechaDocumentoMinDate:any=[];
    FechaDocumentoMaxDate:any=[];
    FechaPolizaMinDate:any=[];
    FechaPolizaMaxDate:any=[];

    seleccionarTodo:boolean=false;

    confTecnicaRequerido:boolean;
    FechaDocumentoRequerido:boolean;
    FechaPolizaRequerido:boolean;

    lstIdSeleccionado:Array<MonitorPoliza>=[];

    urlWebContabilidad:string=environment.urlWebContabilidad;
    urlVerDetalles:string= environment.urlVerDetalles


  ngOnInit(): void {
    // console.log(this.lstIdSeleccionado)
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

  abrirModalInfoOrigen(idConfTecnica,idDoctoOrigen,idTransaccionPrePoliza) {  

    const modalInfoOrigenComponent = this.modalService.open(ModalInfoOrigenComponent, {ariaLabelledBy: 'modal-basic-title',windowClass : "modalSize" , backdrop: 'static'});
    
    modalInfoOrigenComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    const TransaccionClone = JSON.parse(JSON.stringify(idTransaccionPrePoliza));
    const idConfTecnicaClone = JSON.parse(JSON.stringify(idConfTecnica));
    const idDoctoOrigenClone = JSON.parse(JSON.stringify(idDoctoOrigen));
    modalInfoOrigenComponent.componentInstance.CargarValidacionConf(idConfTecnicaClone,idDoctoOrigenClone,TransaccionClone);
  }

  abrirModalHistorialEjecucion(idTransaccionPrePoliza) {  

    const modalHistorialEjecucionComponent = this.modalService.open(ModalHistorialEjecucionComponent, {ariaLabelledBy: 'modal-basic-title',size : 'lg' , backdrop: 'static'});
    //modalInfoOrigenComponent.componentInstance.idDoctoOrigen=idDoctoOrigen
    modalHistorialEjecucionComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    const TransaccionClone = JSON.parse(JSON.stringify(idTransaccionPrePoliza));
    modalHistorialEjecucionComponent.componentInstance.CargarHistorialTransaccion(TransaccionClone);
  }

  CargarMonitorPoliza(pagina:number){
   this.busquedaFiltrada=false;
    // let idConfTecnica=this.busquedaMonitorPoliza.aRepetitivo;
    // let documento=this.busquedaMonitorPoliza.nombreDoctoOrigen;
    // let poliza=this.busquedaMonitorPoliza.poliza;
    // let fechaDoctoInicio=this.busquedaMonitorPoliza.FechaDocumentoInicio;
    // let fechaDoctoFinal=this.busquedaMonitorPoliza.FechaDocumentoFinal;
    // let fechaPolizaInicio=this.busquedaMonitorPoliza.FechaPolizaInicio;
    // let fechaPolizaFinal=this.busquedaMonitorPoliza.FechaPolizaFinal;
    // let estatusTransaccion=this.busquedaMonitorPoliza.SelectEstatus;

    let idConfTecnica=0
    let documento=''
    let poliza=''
    let fechaDoctoInicio=''
    let fechaDoctoFinal=''
    let fechaPolizaInicio=''
    let fechaPolizaFinal=''
    let estatusTransaccion=''
    let procesoTransaccion=''
    if(this.busquedaMonitorPoliza.aRepetitivo!=undefined || this.busquedaMonitorPoliza.aRepetitivo!=null){
      idConfTecnica=this.busquedaMonitorPoliza.aRepetitivo
      this.busquedaFiltrada=true;
    }
    if(this.busquedaMonitorPoliza.nombreDoctoOrigen!=undefined || this.busquedaMonitorPoliza.nombreDoctoOrigen!=null){
      documento=this.busquedaMonitorPoliza.nombreDoctoOrigen
    }
    if(this.busquedaMonitorPoliza.poliza!=undefined || this.busquedaMonitorPoliza.poliza!=null){
      poliza=this.busquedaMonitorPoliza.poliza
    }
    if(this.busquedaMonitorPoliza.FechaDocumentoInicio!=undefined || this.busquedaMonitorPoliza.FechaDocumentoInicio!=null){
      fechaDoctoInicio=this.busquedaMonitorPoliza.FechaDocumentoInicio
    }
    if(this.busquedaMonitorPoliza.FechaDocumentoFinal!=undefined || this.busquedaMonitorPoliza.FechaDocumentoFinal!=null){
      fechaDoctoFinal=this.busquedaMonitorPoliza.FechaDocumentoFinal
    }
    if(this.busquedaMonitorPoliza.FechaPolizaInicio!=undefined || this.busquedaMonitorPoliza.FechaPolizaInicio!=null){
      fechaPolizaInicio=this.busquedaMonitorPoliza.FechaPolizaInicio
    }
    if(this.busquedaMonitorPoliza.FechaPolizaFinal!=undefined || this.busquedaMonitorPoliza.FechaPolizaFinal!=null){
      fechaPolizaFinal=this.busquedaMonitorPoliza.FechaPolizaFinal
    }
    if(this.busquedaMonitorPoliza.SelectEstatus!=undefined || this.busquedaMonitorPoliza.SelectEstatus!=null){
      estatusTransaccion=this.busquedaMonitorPoliza.SelectEstatus
    }
    if(this.busquedaMonitorPoliza.SelectProceso!=undefined || this.busquedaMonitorPoliza.SelectProceso!=null){
      procesoTransaccion=this.busquedaMonitorPoliza.SelectProceso
    }
    //console.log(this.busquedaMonitorPoliza)
    if(!this.busquedaFiltrada){
      this.MonitorPolizaService.Cargar(this.rpp, pagina, idConfTecnica, documento, poliza, fechaDoctoInicio,
        fechaDoctoFinal, fechaPolizaInicio, fechaPolizaFinal, estatusTransaccion,procesoTransaccion).subscribe((monitorPoliza:ApiResult)=>{
        if(monitorPoliza.result!=null){
        this.monitorPoliza = monitorPoliza.result; 
        this.SeleccionarCuentas();
        // this.lstIdSeleccionado=  monitorPoliza.result
        if(this.seleccionarTodo){

        }
        console.log(this.monitorPoliza);
        this.SeleccionarCuentas();
        this.paginador.inicializar(monitorPoliza.existeOtraPagina, pagina); 
  
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
    if(this.busquedaFiltrada){
      this.MonitorPolizaService.Cargar(this.rpp, pagina, idConfTecnica, documento, poliza, fechaDoctoInicio,
        fechaDoctoFinal, fechaPolizaInicio, fechaPolizaFinal, estatusTransaccion,procesoTransaccion).subscribe((monitorPoliza:ApiResult)=>{
        if(monitorPoliza.result!=null){
        this.monitorPoliza = monitorPoliza.result; 
        console.log(this.monitorPoliza);
        this.paginadorFiltrado.inicializar(monitorPoliza.existeOtraPagina, pagina); 
  
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

  }

  CargarAsientoSelected(asiento:any){  
    
      if(asiento.comentario!=undefined){
        this.InputAsientoRepetitivo=asiento.comentario
        this.idConfTecnica=asiento.idConfTecnica
      }
    }

    ValidarBusqueda(){

      this.busquedaValida=true;
      this.confTecnicaRequerido=false;
      this.FechaDocumentoRequerido=false;
      this.FechaPolizaRequerido=false;
      if(this.idConfTecnica==null || this.idConfTecnica==undefined){
        this.busquedaValida=false;
        this.confTecnicaRequerido=true;
      }
      // if(this.InputDocumento==null || this.InputDocumento==undefined){
      //   this.busquedaValida=false;
      // }
      // if(this.InputPoliza==null || this.InputPoliza==undefined){
      //   this.busquedaValida=false;
      // }
      if(this.FechaDocumentoInicio!=null || this.FechaDocumentoInicio!=undefined){
        if(this.FechaDocumentoFinal==null || this.FechaDocumentoFinal==undefined){
          this.busquedaValida=false;
          this.FechaDocumentoRequerido=true;
        }
      }

      if(this.FechaPolizaInicio!=null || this.FechaPolizaInicio!=undefined){
        if(this.FechaPolizaFinal==null || this.FechaPolizaFinal==undefined){
          this.busquedaValida=false;
          this.FechaPolizaRequerido=true;
        }
      }
      // if(this.SelectEstatus==null || this.SelectEstatus==undefined){
      //   this.busquedaValida=false;
      // }
      
    }


  BuscarPoliza(){

    this.ValidarBusqueda();

    if(this.busquedaValida){
      this.busquedaMonitorPoliza.aRepetitivo=this.idConfTecnica;
      this.busquedaMonitorPoliza.nombreDoctoOrigen=this.InputDocumento;
      this.busquedaMonitorPoliza.poliza=this.InputPoliza;

      if(this.FechaDocumentoInicio!=undefined || this.FechaDocumentoInicio!=null){
        const dpFechaDocumentoInicio: DatePipe = new DatePipe('en-US') 
        this.busquedaMonitorPoliza.FechaDocumentoInicio= dpFechaDocumentoInicio.transform(new Date(this.FechaDocumentoInicio.year+'-'+this.FechaDocumentoInicio.month+'-'+this.FechaDocumentoInicio.day), 'yyyy-MM-dd');
      }     
      
      if(this.FechaDocumentoFinal!=undefined || this.FechaDocumentoFinal!=null){
        const dpFechaDocumentoFinal: DatePipe = new DatePipe('en-US') 
        this.busquedaMonitorPoliza.FechaDocumentoFinal= dpFechaDocumentoFinal.transform(new Date(this.FechaDocumentoFinal.year+'-'+this.FechaDocumentoFinal.month+'-'+this.FechaDocumentoFinal.day), 'yyyy-MM-dd');
      }
      if(this.FechaPolizaInicio!=undefined || this.FechaPolizaInicio!=null){
        const dpFechaPolizaInicio: DatePipe = new DatePipe('en-US') 
        this.busquedaMonitorPoliza.FechaPolizaInicio= dpFechaPolizaInicio.transform(new Date(this.FechaPolizaInicio.year+'-'+this.FechaPolizaInicio.month+'-'+this.FechaPolizaInicio.day), 'yyyy-MM-dd');
      }
      if(this.FechaPolizaFinal!=undefined || this.FechaPolizaFinal!=null){
        const dpFechaPolizaFinal: DatePipe = new DatePipe('en-US') 
        this.busquedaMonitorPoliza.FechaPolizaFinal= dpFechaPolizaFinal.transform(new Date(this.FechaPolizaFinal.year+'-'+this.FechaPolizaFinal.month+'-'+this.FechaPolizaFinal.day), 'yyyy-MM-dd');
      }
    
      this.busquedaMonitorPoliza.SelectEstatus= this.SelectEstatus;

      this.busquedaMonitorPoliza.SelectProceso= this.SelectProceso;

     console.log(this.busquedaMonitorPoliza)
     this.CargarMonitorPoliza(1)
    }
    else{
      this.toastr.error("Verifique los campos");

    
    }

    }


  evtPaginaSeleccionada(pagina) {
    this.CargarMonitorPoliza(pagina);
}

  LimpiarFiltro(){
    this.InputAsientoRepetitivo=null;
    this.idConfTecnica=null
    this.SelectEstatus=null;
    this.SelectProceso=null;
    this.InputDocumento=null;
    this.FechaDocumentoInicio=null;
    this.FechaDocumentoFinal=null
    this.InputPoliza=null;
    this.FechaPolizaInicio=null
    this.FechaPolizaFinal=null
    this.busquedaMonitorPoliza=[]
    console.log(this.busquedaMonitorPoliza)

    this.confTecnicaRequerido=false;
    this.FechaDocumentoRequerido=false;
    this.FechaPolizaRequerido=false;

    this.CargarMonitorPoliza(1);

    
  }



  VerDetalles(idDoctoOrigen){
    window.open(this.urlVerDetalles+idDoctoOrigen);
  }

  GenerarPolizaSeleccionada(){
   let idSelected=[];
   let cadenaIdSelected:string;
   let idsTransacciones={idsTransacciones:''};
    this.lstIdSeleccionado.filter(e =>e.seleccionado===true).forEach((e) => {
      idSelected.push(e.idTransaccionPrePoliza); 
    });
    cadenaIdSelected=idSelected.join(', ');

    if(cadenaIdSelected!=''){
      idsTransacciones.idsTransacciones=cadenaIdSelected
      console.log(idsTransacciones)
      this.MonitorPolizaService.GenerarPolizaSeleccionada(idsTransacciones).then((response: ApiResult)=>{
      console.log(response)
        if(response.objModResultado!=null){
          if(response.objModResultado.error){
            console.log(response.objModResultado.mensajeError);
            if(response.objModResultado.mensajeError=="0")
            {
              this.toastr.error("No se afectó ninguna póliza");
            }             
          }
          if(!response.objModResultado.error){
           
          }
        }
        if(response.objModResultado==null){
          this.toastr.success("Se agregó documento a la cola de generación de pólizas")
        }
  
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error generar póliza(s) seleccionada(s).");
  
        });
    }
    if(cadenaIdSelected==''){this.toastr.error("No se han seleccionado elementos")}

  }

  SeleccionarCuentas()
  {
  //  alert("aa")
    //console.log(this.seleccionarTodo)
    this.monitorPoliza.forEach(element => {
      // if(this.seleccionarTodo){
      //   element.seleccionado=true;
      // }
      let index=this.lstIdSeleccionado.findIndex(i=>i.idTransaccionPrePoliza ==element.idTransaccionPrePoliza);
      //console.log(index)
      if(index >-1)
      {
        element.seleccionado=true;        
      }
     });
  }

  seleccionar(item)
  {
    //console.log(item )

    if(item.seleccionado==true){
      
       this.lstIdSeleccionado.push(item)

    }else{
      let index=this.lstIdSeleccionado.findIndex(i=>i.idTransaccionPrePoliza ==item.idTransaccionPrePoliza);
      if(index >-1){
        
        this.lstIdSeleccionado.splice(index,1);
        
      }      
    }
    console.log(this.lstIdSeleccionado);
  }

  seleccionarTodos(event){
    const {checked} = event.target;
    this.monitorPoliza.forEach(element => element.seleccionado = checked);
   // this.monitorPoliza.forEach(element => this.lstIdSeleccionado.push(element) );
   this.SeleccionarCuentas();
    
   // this.lstIdSeleccionado.forEach(element => element.seleccionado = checked);
    console.log(this.lstIdSeleccionado);
  }

  PolizaManual(idEncPoliza,idEjercicio){
     window.open(this.urlWebContabilidad+'polizas/nueva/'+idEncPoliza+'/'+idEjercicio);
  }

}
