import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfTecRepetitivoService } from '../../../../services/conf-tec-repetitivo.service';
import { Paginador } from '../../../../models/common/paginador';
import { ToastrService } from 'ngx-toastr';
import { ApiResult } from '../../../../models/common/apiResult';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-info-origen',
  templateUrl: './modal-info-origen.component.html',
  styleUrls: ['./modal-info-origen.component.css']
})
export class ModalInfoOrigenComponent implements OnInit {

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal 
    , private confTecRepetitivoService:ConfTecRepetitivoService, private toastr: ToastrService) { }

    ValidacionConf:any;
    cargaDeValidacion:boolean=false;
    // IdTransaccionPrePoliza:number;
    registroNuevo:boolean=false;
    MensajeErrorCargarValidacion:string=null;
    MensajeErrorObjetosVacios:string=null;
    ErrorCargarValidacion:boolean=false;

    DoPrepoliza:any;

    ModEncDOPolizaAdicional:any;
    ModDetDOPoliza:any;
    ModDetDOPolizaAdicional:any;
    ModDetDOPolizaCFDi:any;
  
    Msgs:any=[];
    ModEncPoliza:any;
    ModEncPolizaAdicional:any;
    ModDetPoliza:any;
    ModDetPolizaTipoContabilidad:any;
    ModDetPolizaAdicionales:any;
    ModDetPolizaCentroCosto:any;
    ModRelPolizaCFDi:any;
    ConfPolizaRepetitivo:any

    MensajePestanaErrores:string;
  
    active = 1;
    
  ngOnInit(): void {
  }

  CargarValidacionConf(idConfTecnica,idDoctoOrigen,IdTransaccionPrePoliza){
    //console.log(this.idConfTecnica)
    this.cargaDeValidacion=false;
    this.ValidacionConf=null;

    this.MensajeErrorObjetosVacios=null
   console.log(idConfTecnica+'v'+idDoctoOrigen+'v'+IdTransaccionPrePoliza)
   this.confTecRepetitivoService.ValidarInformacionOrigen(idConfTecnica,idDoctoOrigen,IdTransaccionPrePoliza).subscribe((validacionCofiguracion:ApiResult)=>{
    console.log(validacionCofiguracion.objModResultado)
     console.log(validacionCofiguracion)
     if(validacionCofiguracion.result!=null && validacionCofiguracion.objModResultado.error==false){
       this.cargaDeValidacion=true;
       this.ValidacionConf=validacionCofiguracion.result;
       this.MensajeErrorCargarValidacion=null;
       this.LlenarCamposValidacion(this.ValidacionConf); 
     }
     if(validacionCofiguracion.objModResultado.error==true){
      // this.toastr.error(validacionCofiguracion.objModResultado.mensajeError);
       this.MensajeErrorCargarValidacion=validacionCofiguracion.objModResultado.mensajeError


       if(validacionCofiguracion.result.prePoliza!=null ){
         this.cargaDeValidacion=true;
         this.ValidacionConf=validacionCofiguracion.result;          
         this.LlenarCamposValidacion(this.ValidacionConf); 
         if(validacionCofiguracion.result.doPrePoliza==null){

           this.MensajeErrorObjetosVacios="Pre-Poliza esta vacío"

         }
       }
       if(validacionCofiguracion.result.doPrePoliza!=null){
         this.cargaDeValidacion=true;
         this.ValidacionConf=validacionCofiguracion.result;
         this.LlenarCamposValidacion(this.ValidacionConf); 
         if(validacionCofiguracion.result.PrePoliza==null){
           this.MensajeErrorObjetosVacios="Datos de origen Pre-Poliza esta vacío"

         }
       }
     }
   }, error=> {
    console.log(error);
     if(typeof error==="object"){

       if(error.error=='Object reference not set to an instance of an object.'){
        // this.toastr.error('No se encontró la SP o este es incorrecto.');
         this.MensajeErrorCargarValidacion='No se encontró la SP o este es incorrecto.'
       }
       else{
         this.toastr.error(error.error);
       }
     } else {
       this.toastr.error(error);
     }
   });   
 }

 LlenarCamposValidacion(ValidacionConf:any){

  console.log(ValidacionConf)

  if(ValidacionConf.prePoliza!=null){
    this.ConfPolizaRepetitivo= new Array;
    this.ConfPolizaRepetitivo.push(ValidacionConf.prePoliza.objConfPolizaRepetitivo)
    console.log(this.ConfPolizaRepetitivo.aplicarPoliza)
    if(this.ConfPolizaRepetitivo[0].aplicarPoliza==true){this.ConfPolizaRepetitivo[0].aplicarPoliza='Si';}
    if(this.ConfPolizaRepetitivo[0].aplicarPoliza==false){this.ConfPolizaRepetitivo[0].aplicarPoliza='No';}
    if(this.ConfPolizaRepetitivo[0].requiereCFDi==true){this.ConfPolizaRepetitivo[0].requiereCFDi='Si'}
    if(this.ConfPolizaRepetitivo[0].requiereCFDi==false){this.ConfPolizaRepetitivo[0].requiereCFDi='No'}
    //   this.InputIdEncabezadoRepetitivo=ValidacionConf.prePoliza.objConfPolizaRepetitivo.idEncRepetitivo;
  // if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.aplicarPoliza==1){this.InputAplicarPoliza='Si';}
  // if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.aplicarPoliza==0){this.InputAplicarPoliza='No';}
  // if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.requiereCFDi==1){this.InputRequiereCFDi='Si'}
  // if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.requiereCFDi==0){this.InputRequiereCFDi='No'}
  // this.InputAsientoRepetitivo=ValidacionConf.prePoliza.objConfPolizaRepetitivo.asientoRepetitivo;

    this.ModDetPoliza=ValidacionConf.prePoliza.lstModDetPoliza;
    this.ModDetPolizaAdicionales=ValidacionConf.prePoliza.lstModDetPolizaAdicionales;
    this.ModDetPolizaCentroCosto=ValidacionConf.prePoliza.lstModDetPolizaCentroCosto
    this.ModDetPolizaTipoContabilidad=ValidacionConf.prePoliza.lstModDetPolizaTipoContabilidad;
    this.ModRelPolizaCFDi=ValidacionConf.prePoliza.lstModRelPolizaCFDi;
    this.ModEncPolizaAdicional=ValidacionConf.prePoliza.lstModEncPolizaAdicional;
    
    this.ModEncPoliza= new Array;
    this.ModEncPoliza.push(ValidacionConf.prePoliza.objModEncPoliza)
    if(this.ModEncPoliza[0]==null){this.ModEncPoliza=[]}
    this.Msgs=ValidacionConf.prePoliza.lstMsg;
    if(this.Msgs.length!=0){
      this.toastr.error("Verifique los errores encontrados.");
      this.MensajePestanaErrores='Errores'

    }
    if(this.Msgs.length==0){
      this.MensajePestanaErrores='No hay Errores'
    }
    if(this.MensajeErrorCargarValidacion!=null){
      this.toastr.error("Verifique los errores encontrados.");
      this.MensajePestanaErrores='Errores'

    }

  }
  if(ValidacionConf.doPrePoliza!=null){
    this.DoPrepoliza=new Array;
    this.DoPrepoliza.push(ValidacionConf.doPrePoliza)

    this.ModDetDOPoliza=ValidacionConf.doPrePoliza.lstModDetDOPoliza;
    this.ModDetDOPolizaAdicional=ValidacionConf.doPrePoliza.lstModDetDOPolizaAdicional;
    this.ModDetDOPolizaCFDi=ValidacionConf.doPrePoliza.lstModDetDOPolizaCFDi;
    this.ModEncDOPolizaAdicional=ValidacionConf.doPrePoliza.lstModEncDOPolizaAdicional;
  }
  
}

}
