import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from '../../../../models/common/apiResult';
import { ConfTecRepetitivoService } from '../../../../services/conf-tec-repetitivo.service';
import { ToastrService } from 'ngx-toastr';
import {confRepetitivo} from '../../../../models/confRepetitivo'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-conf-adi-cont',
  templateUrl: './modal-conf-adi-cont.component.html',
  styleUrls: ['./modal-conf-adi-cont.component.css']
})
export class ModalConfAdiContComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
    private confTecRepetitivoService:ConfTecRepetitivoService, private toastr: ToastrService) { }

  InputStoreProcedure:string;
  InputOpcion:number;
  InputIdPlantilla:number;
  InputIntentoPoliza:number;
  InputIdPrueba:number;
  confiactiva:boolean;

  InputAsientoRepetitivo:string;
  InputRequiereCFDi:string;
  InputAplicarPoliza:string;
  InputIdEncabezadoRepetitivo:number;

  confRepetitivo:any= new confRepetitivo;
  idConfTecnica:number;
  registroNuevo:boolean=false;

  formValido:boolean=true;

  StoreProcedureRequerido:boolean=false;
  OpcionRequerido:boolean=false;
  IntentoPolizaRequerido:boolean=false;
  IdPlantillaRequerido:boolean=false;
  IdPrueba:boolean=false;
  StoreProcedureLimite:number;
  StoreProcedureSobrepasa:boolean;
  confActivaprincipal:boolean;
  clickEnDeshabilitado:boolean=false;

  ValidacionConf:any;
  cargaDeValidacion:boolean=false;

  ModEncDOPolizaAdicional:any;
  ModDetDOPoliza:any;
  ModDetDOPolizaAdicional:any;
  ModDetDOPolizaCFDi:any;

  Msgs:any;
  ModEncPoliza:any;
  ModEncPolizaAdicional:any;
  ModDetPoliza:any;
  ModDetPolizaTipoContabilidad:any;
  ModDetPolizaAdicionales:any;
  ModDetPolizaCentroCosto:any;
  ModRelPolizaCFDi:any;
  ConfPolizaRepetitivo:any

  InputidEncRepetitivoParam;
  InputFechaDocto;
  InputIdMoneda;
  InputTipoCambio;
  InputComentario;


  ngOnInit(): void {
  }

  ValidarForm(){
    this.formValido=true;
    this.StoreProcedureRequerido=false;
    this.OpcionRequerido=false;
    this.IntentoPolizaRequerido=false;
    this.IdPlantillaRequerido=false;
    this.IdPrueba=false;
    this.StoreProcedureSobrepasa=false;

    if(this.InputStoreProcedure==null || this.InputStoreProcedure.trim()==''){
      this.formValido=false;
      this.StoreProcedureRequerido=true;
    }
    if(this.InputStoreProcedure!=undefined){
      if(this.InputStoreProcedure.length==255){
        this.formValido=false;
        this.StoreProcedureSobrepasa=true;
      }
    }
    if(this.InputOpcion==null){
      this.formValido=false;
      this.OpcionRequerido=true;
    }
    if(this.InputIntentoPoliza==null){
      this.formValido=false;
      this.IntentoPolizaRequerido=true;
    }
    if(this.InputIdPlantilla==null){
      this.formValido=false;
      this.IdPlantillaRequerido=true;
    }
    if(this.InputIdPrueba==null){
      this.formValido=false;
      this.IdPrueba=true;
    }
  }

  CargarConfRepetitivo(confRepetitivoMod){
    this.confiactiva=true;
   /// console.log(confRepetitivoMod)
    
    this.confTecRepetitivoService.Cargar(confRepetitivoMod.idConfTecnica).subscribe((confTecnica:ApiResult)=>{
     // console.log(confTecnica.result)
      if(confTecnica.result!=null){
      this.confRepetitivo=confTecnica.result;
      this.registroNuevo=false;
      this.InputStoreProcedure=this.confRepetitivo.storeProcedure;
      this.InputOpcion=this.confRepetitivo.opcion;
      this.InputIntentoPoliza=this.confRepetitivo.numeroIntentos;
      this.InputIdPlantilla=this.confRepetitivo.idEncConfPlantilla;
      this.InputIdPrueba=this.confRepetitivo.spIdPrueba;
      this.confiactiva=this.confRepetitivo.estatus;      
      this.confActivaprincipal=confRepetitivoMod.estatus;
      }
      if(confTecnica.result==null){
      // this.confRepetitivo=confTecnica.result;
      this.registroNuevo=true;
    //  this.confActivaprincipal=false;
      }
      this.idConfTecnica=confRepetitivoMod.idConfTecnica;
   

    }, error=> {
     console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });   
  }

  GuardarConfTecRepetitivo(){
    this.ValidarForm()

    if(this.formValido)
    {
      this.confRepetitivo.storeProcedure=this.InputStoreProcedure.trim();
      this.confRepetitivo.opcion=this.InputOpcion;
      this.confRepetitivo.idEncConfPlantilla=this.InputIdPlantilla;
      this.confRepetitivo.numeroIntentos=this.InputIntentoPoliza;
      this.confRepetitivo.spIdPrueba=this.InputIdPrueba;
      this.confRepetitivo.estatus=this.confiactiva
     // console.log('guardar '+this.confRepetitivo.estatus)
      if(this.registroNuevo){
         this.confRepetitivo.idConfTecnica=this.idConfTecnica
         this.confTecRepetitivoService.Guardar(this.confRepetitivo).then((response: ApiResult)=>{
          // this.modalActive.dismiss()
           this.toastr.success("Se agregó la configuración técnica de repetitivos exitosamente.");
           }, error=> {
             console.log(error);
             this.toastr.error("Ocurrió un error al agregar la configuración técnica de repetitivos.");
           });   
       }
       else{
        this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
      //  this.modalActive.dismiss()
        this.toastr.success("Se modificó la configuración técnica de repetitivos exitosamente.");
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al modificar la configuración técnica de repetitivos.");
        });   
      }
    }
    else{
      this.toastr.error("Verifique los campos.");

    }
  }

  onChangeConfiguracionActiva(e){

   // console.log(e.target.checked)
    this.confiactiva=!e.target.checked;
    // if(!this.registroNuevo)
    // {
    //   if(!e.target.checked){
    //     this.confiactiva=!e.target.checked;
    //     this.confRepetitivo.estatus=!e.target.checked;
    //     this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
    //       this.toastr.success("Se activó la configuración técnica del repetitivo.");
    //     }, error=> {
    //       console.log(error);
    //       this.toastr.error("Ocurrió un error al modificar la configuración técnica de repetitivos.");
    //     }); 
    //   }
    //   else{
    //     this.confRepetitivo.estatus=!e.target.checked;
    //     this.confiactiva=!e.target.checked;
    //     this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
    //       this.toastr.success("Se desactivó la configuración técnica del repetitivo.");
    //     }, error=> {
    //       console.log(error);
    //       this.toastr.error("Ocurrió un error al modificar la configuración técnica de repetitivos.");
    //     });
    //   }

    // }
    // else{

    // }

  }
  
  ClickOnDisabled(){
   // console.log(this.confActivaprincipal)
    if(this.confActivaprincipal)
    {
      this.toastr.error("No se puede activar si la configuración técnica esta desactivada");
    }
  }

  CargarValidacionConf(){
     //console.log(this.idConfTecnica)
     let idConfTecnica:number=this.idConfTecnica;
    
    this.confTecRepetitivoService.CargarValidacion(idConfTecnica,1).subscribe((validacionCofiguracion:ApiResult)=>{
      
      if(validacionCofiguracion.result!=null){
        this.cargaDeValidacion=true;
        this.ValidacionConf=validacionCofiguracion.result;

        this.LlenarCamposValidacion(this.ValidacionConf); 
      }
      if(validacionCofiguracion.result==null){
  
      }


    }, error=> {
     console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });   

  }

  LlenarCamposValidacion(ValidacionConf:any){
    //  this.InputComentario=ValidacionConf.doPrePoliza.polizaComentarios;
    //  this.EncabezadoUUID=ValidacionConf.prePoliza.lstModRelPolizaCFDi[0].uuid;
    //console.log(ValidacionConf);

    this.InputidEncRepetitivoParam=this.InputComentario=ValidacionConf.doPrePoliza.idEncRepetitivoParam;
    const datepipe: DatePipe = new DatePipe('en-US')
    this.InputFechaDocto=    datepipe.transform(this.InputComentario=ValidacionConf.doPrePoliza.fechaDocto, 'dd-MM-yyyy');;
    this.InputIdMoneda=ValidacionConf.doPrePoliza.idMoneda;
    this.InputTipoCambio=ValidacionConf.doPrePoliza.tipoDeCambio;
    this.InputComentario=ValidacionConf.doPrePoliza.polizaComentarios;

    //this.ConfPolizaRepetitivo= new Array;
    //this.ConfPolizaRepetitivo.push(ValidacionConf.prePoliza.objConfPolizaRepetitivo)
    console.log(ValidacionConf.prePoliza.objConfPolizaRepetitivo)
    this.InputIdEncabezadoRepetitivo=ValidacionConf.prePoliza.objConfPolizaRepetitivo.idEncRepetitivo;
    if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.aplicarPoliza==1){this.InputAplicarPoliza='Si';}
    if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.aplicarPoliza==0){this.InputAplicarPoliza='No';}
    if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.requiereCFDi==1){this.InputRequiereCFDi='Si'}
    if(ValidacionConf.prePoliza.objConfPolizaRepetitivo.requiereCFDi==0){this.InputRequiereCFDi='No'}
    this.InputAsientoRepetitivo=ValidacionConf.prePoliza.objConfPolizaRepetitivo.asientoRepetitivo;
 

    this.ModDetDOPoliza=ValidacionConf.doPrePoliza.lstModDetDOPoliza;
    this.ModDetDOPolizaAdicional=ValidacionConf.doPrePoliza.lstModDetDOPolizaAdicional;
    this.ModDetDOPolizaCFDi=ValidacionConf.doPrePoliza.lstModDetDOPolizaCFDi;
    this.ModEncDOPolizaAdicional=ValidacionConf.doPrePoliza.lstModEncDOPolizaAdicional;

    this.ModDetPoliza=ValidacionConf.prePoliza.objModDetPoliza;
    this.ModDetPolizaAdicionales=ValidacionConf.prePoliza.objModDetPolizaAdicionales;
    this.ModDetPolizaCentroCosto=ValidacionConf.prePoliza.objModDetPolizaCentroCosto
    this.ModDetPolizaTipoContabilidad=ValidacionConf.prePoliza.objModDetPolizaTipoContabilidad;
    this.ModRelPolizaCFDi=ValidacionConf.prePoliza.objModRelPolizaCFDi;
    this.ModEncPolizaAdicional=ValidacionConf.prePoliza.objModEncPolizaAdicional;
    this.ModEncPoliza= new Array;
    this.ModEncPoliza.push(ValidacionConf.prePoliza.objModEncPoliza)


    this.Msgs=ValidacionConf.prePoliza.lstMsg;
  }

}
