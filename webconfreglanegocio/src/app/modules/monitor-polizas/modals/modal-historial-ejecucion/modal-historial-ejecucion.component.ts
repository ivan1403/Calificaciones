import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MonitorPolizaService } from '../../../../services/monitor-poliza.service'
import { Paginador } from '../../../../models/common/paginador';
import { ToastrService } from 'ngx-toastr';
import { ApiResult } from '../../../../models/common/apiResult';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-historial-ejecucion',
  templateUrl: './modal-historial-ejecucion.component.html',
  styleUrls: ['./modal-historial-ejecucion.component.css']
})
export class ModalHistorialEjecucionComponent implements OnInit {

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal 
    ,private MonitorPolizaService:MonitorPolizaService, private toastr: ToastrService) { }
 
    paginador = new Paginador()
    paginadorFiltrado = new Paginador()
    rpp=10;
    pagina:number;
    busquedaFiltrada:boolean=false;   

    historial:any=[];
    SinBusqueda=false;
    TransaccionClone:any;

    FechaInicio;
    FechaFinal;

    busquedaValida:boolean
  ngOnInit(): void {

  }

  CargarHistorialTransaccion(TransaccionClone){
  this.TransaccionClone=TransaccionClone;
  this.CargarHistorial(1)
  }

  CargarHistorial(pagina){
    //console.log(this.TransaccionClone)
    this.busquedaFiltrada=false;
    this.ValidarBusqueda();
    let fechaInicio=this.FechaInicio;
    let fechaFinal=this.FechaFinal
    if(this.busquedaValida){

      if(this.FechaInicio!=undefined || this.FechaInicio!=null){
        const dpFechaInicio: DatePipe = new DatePipe('en-US') 
        fechaInicio= dpFechaInicio.transform(new Date(fechaInicio.year+'-'+fechaInicio.month+'-'+fechaInicio.day), 'yyyy-MM-dd');
      } 


      if(this.FechaFinal!=undefined || this.FechaFinal!=null){
        const dpFechaFinal: DatePipe = new DatePipe('en-US') 
        fechaFinal= dpFechaFinal.transform(new Date(fechaFinal.year+'-'+fechaFinal.month+'-'+fechaFinal.day), 'yyyy-MM-dd');
      } 
 
   //   console.log(fechaInicio+'  aaa')
      this.MonitorPolizaService.CargarHistorial(this.rpp, pagina, this.TransaccionClone,fechaInicio,fechaFinal).subscribe((monitorPoliza:ApiResult)=>{
      //  console.log(monitorPoliza.result)
        this.historial=monitorPoliza.result;
        this.paginador.inicializar(monitorPoliza.existeOtraPagina, pagina);
        }, error=> {
          if(typeof error==="object"){
            this.toastr.error("Ocurrió un error al conectarse al servidor.");
          } else {
            this.toastr.error(error);
          }
        });
    }
    else{
      this.toastr.error("Verifique los campos");
    }
    


  }

  ValidarBusqueda(){
    this.busquedaValida=true;
    if(this.FechaInicio!=null || this.FechaInicio!=undefined){
      if(this.FechaFinal==null || this.FechaInicio==undefined){
        this.busquedaValida=false;
      }
    }

    
  }

  evtPaginaSeleccionada(pagina) {
    this.CargarHistorial(pagina);
  }



}
