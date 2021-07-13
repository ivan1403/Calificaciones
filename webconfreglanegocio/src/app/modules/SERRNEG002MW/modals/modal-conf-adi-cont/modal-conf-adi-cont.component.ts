import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from '../../../../models/common/apiResult';
import { ConfTecRepetitivoService } from '../../../../services/conf-tec-repetitivo.service';
import { ToastrService } from 'ngx-toastr';
import {confRepetitivo} from '../../../../models/confRepetitivo'
import { DatePipe } from '@angular/common';
import  Swal  from 'sweetalert2'

@Component({
  selector: 'app-modal-conf-adi-cont',
  templateUrl: './modal-conf-adi-cont.component.html',
  styleUrls: ['./modal-conf-adi-cont.component.css']
})
export class ModalConfAdiContComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
    private confTecRepetitivoService:ConfTecRepetitivoService, private toastr: ToastrService) { }

  btnGuardar:boolean=false;

  InputStoreProcedure:string;
  InputOpcion:number;
  InputIdPlantilla:number;
  InputIntentoPoliza:number;
  InputIdPrueba:number;
  confiactiva:boolean;

  InputIdRepetitivo;
  InputAliasRepeteitivo;
  InputCondicion;

  InputAsientoRepetitivo:string;
  InputRequiereCFDi:string;
  InputAplicarPoliza:string;
  InputIdEncabezadoRepetitivo:number;

  confRepetitivo:any= new confRepetitivo;
  idConfTecnica:number;
  registroNuevo:boolean=false;
  confTecnicaPrincipal:any;

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

  DoPrepoliza:any;

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


  MensajeErrorCargarValidacion:string=null;
  MensajeErrorObjetosVacios:string=null;
  ErrorCargarValidacion:boolean=false;
  MensajePestanaErrores:string;

  active = 1;

  guardarDeshabilitado:boolean;
  permitirActivarEstatus:boolean;

  hayCambios:boolean;


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
    this.confTecnicaPrincipal=confRepetitivoMod
    this.confiactiva=true;
    this.guardarDeshabilitado=true;
    console.log(this.confTecnicaPrincipal)
   this.confTecRepetitivoService.CargarEncRepetitivo(confRepetitivoMod.idEncRepetitivo).subscribe((EncRepetitivo:ApiResult)=>{
    console.log(EncRepetitivo.result)
    if(EncRepetitivo.result!=null){
      this.InputAliasRepeteitivo=EncRepetitivo.result.asientoRepetitivo
      this.InputIdRepetitivo=confRepetitivoMod.idEncRepetitivo; 
      this.InputCondicion=confRepetitivoMod.nombreCondicion; 
    }

  }, error=> {
    console.log(error);
    this.guardarDeshabilitado=true;
    if(typeof error==="object"){
      this.toastr.error("Ocurrió un error al conectarse al servidor.");
      
    } else {
      this.toastr.error(error);
    }
  });  

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
      if(this.confRepetitivo.estatus==undefined || this.confRepetitivo.estatus==true){
        this.permitirActivarEstatus=true; 
      }
      if(this.confRepetitivo.estatus==false){
        this.confiactiva=this.confRepetitivo.estatus; 
      }
      console.log(this.confRepetitivo.estatus)
       
      this.confActivaprincipal=confRepetitivoMod.estatus;



      }
      if(confTecnica.result==null){
        // this.confRepetitivo=confTecnica.result;
        this.registroNuevo=true;
        // this.confActivaprincipal=false;
        this.permitirActivarEstatus=true;    
      }

      this.idConfTecnica=confRepetitivoMod.idConfTecnica;  

    }, error=> {
     console.log(error);
     this.guardarDeshabilitado=true;
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
        this.guardarDeshabilitado=true;
      } else {
        this.toastr.error(error);
      }
    });   
  }

  GuardarConfTecRepetitivo(){
    this.ValidarForm()

    if(this.formValido)
    {
      this.btnGuardar=true;
      this.CompararOriginalConCambio();
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
          console.log(response)
          if(response.objModResultado.error){
            this.toastr.error("Ocurrió un error al guardar la configuración técnica de repetitivos.");
            this.registroNuevo=true;
            this.btnGuardar=false;
          }
          if(!response.objModResultado.error){
            this.toastr.success("Se agregó la configuración técnica de repetitivos exitosamente.");
            this.registroNuevo=false;
            this.btnGuardar=false;
            this.CargarConfRepetitivo(this.confTecnicaPrincipal)
          }
           }, error=> {
             console.log(error);
             this.toastr.error("Ocurrió un error al agregar la configuración técnica de repetitivos.");
              this.registroNuevo=true;
              this.btnGuardar=false;
           });   
       }
       else{
        this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
      //  this.modalActive.dismiss()
      this.cargaDeValidacion=false
      if(response.objModResultado!=null){
        if(response.objModResultado.error){
          this.toastr.error("Ocurrió un error al modificar la configuración técnica de repetitivos."); 
          this.btnGuardar=false;
        }
        if(!response.objModResultado.error){
          this.toastr.success("Se actualizó la configuración técnica de repetitivos exitosamente.");
          this.btnGuardar=false;
       
          console.log("hay cambios"+this.hayCambios)
          if(this.hayCambios){this.DesactivarConfTecnica()}          
          this.CargarConfRepetitivo(this.confTecnicaPrincipal)
          
        }
      }
      if(response.objModResultado==null){
        this.toastr.success("Se actualizó la configuración técnica de repetitivos exitosamente.");
        this.btnGuardar=false;

        console.log("hay cambios"+this.hayCambios)
        if(this.hayCambios){this.DesactivarConfTecnica()}    
        this.CargarConfRepetitivo(this.confTecnicaPrincipal)
      }
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al modificar la configuración técnica de repetitivos.");
          this.btnGuardar=false;
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
  }
  
  ClickOnDisabled(){
   // console.log(this.confActivaprincipal)
    if(this.confActivaprincipal)
    {
      this.toastr.error("No se puede activar si la configuración técnica esta desactivada");
    }
    if(this.permitirActivarEstatus)
    {
      this.toastr.error("No se puede activar el estatus sin haber cargado una configuracion sin errores");
    }
  }

  CargarValidacionConf(){
     //console.log(this.idConfTecnica)
     this.cargaDeValidacion=false;
     this.ValidacionConf=null;
     let idConfTecnica:number=this.idConfTecnica;
     this.MensajeErrorObjetosVacios=null

     
    this.CompararOriginalConCambio();
    if(this.hayCambios){
     // alert("Guarde cambios antes de cargar validacion")
      Swal.fire('Guarde cambios antes de cargar validación')
    }
    else{
      this.confTecRepetitivoService.CargarValidacion(idConfTecnica,this.InputIdPrueba).subscribe((validacionCofiguracion:ApiResult)=>{
        // debugger
         console.log(validacionCofiguracion.objModResultado)
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
               this.guardarDeshabilitado=true;
             }
           }
           if(validacionCofiguracion.result.doPrePoliza!=null){
             this.cargaDeValidacion=true;
             this.ValidacionConf=validacionCofiguracion.result;
             this.LlenarCamposValidacion(this.ValidacionConf); 
             if(validacionCofiguracion.result.PrePoliza==null){
               this.MensajeErrorObjetosVacios="Datos de origen Pre-Poliza esta vacío"
               this.guardarDeshabilitado=true;
             }
           }
         }
       }, error=> {
        console.log(error);
         if(typeof error==="object"){
           this.guardarDeshabilitado=true;

             this.toastr.error(error.error);
           
         } else {
           this.toastr.error(error);
         }
       }); 
    }
    
  
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
        this.guardarDeshabilitado=true;
        this.MensajePestanaErrores='Errores'
      }
      if(this.Msgs.length==0){
        this.guardarDeshabilitado=false;
        this.MensajePestanaErrores='No hay Errores'
        this.ActivarConfTecnicaCorrecta();
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

  CerrarModal(){

    this.CompararOriginalConCambio();
    if(this.hayCambios){
      Swal.fire({
        title: "Los cambios no se han guardado ¿Desea continuar?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        allowEscapeKey: false,
        allowOutsideClick: false

      }).then((result) => {
          if (result.isConfirmed) {
            this.modalActive.dismiss()
          }else{


          }
      });
    }
    else{
      this.modalActive.dismiss()
    }

  }

  CompararOriginalConCambio(){
    this.hayCambios=false;
    console.log(this.InputStoreProcedure + '   '+this.confRepetitivo.storeProcedure)
    if( this.InputStoreProcedure!=this.confRepetitivo.storeProcedure){
      this.hayCambios=true;
    }
    if( this.InputOpcion!=this.confRepetitivo.opcion){
      this.hayCambios=true;
    }
    if( this.InputIntentoPoliza!=this.confRepetitivo.numeroIntentos){
      this.hayCambios=true;
    }
    if( this.InputIdPlantilla!=this.confRepetitivo.idEncConfPlantilla){
      this.hayCambios=true;
    }
    if( this.InputIdPrueba!=this.confRepetitivo.spIdPrueba){
      this.hayCambios=true;
    }
   // console.log(this.confiactiva)
    if( this.confiactiva!=this.confRepetitivo.estatus){
      this.hayCambios=true;
    }

  }

  ActivarConfTecnicaCorrecta(){
    this.confiactiva=false
    this.confRepetitivo.estatus=false;
    this.permitirActivarEstatus=false;
    this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
      //  this.modalActive.dismiss()
      if(response.objModResultado!=null){
        if(response.objModResultado.error){
          this.toastr.error("Ocurrió un error al activar la configuración técnica de repetitivos."); 
          this.btnGuardar=false;
        }
        if(!response.objModResultado.error){
          this.toastr.success("Se activó la configuración técnica de repetitivos exitosamente.");
          this.btnGuardar=false;
          this.CargarConfRepetitivo(this.confTecnicaPrincipal)
        }
      }
      if(response.objModResultado==null){
        this.toastr.success("Se activó la configuración técnica de repetitivos exitosamente.");
        this.btnGuardar=false;
      }
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al activar la configuración técnica de repetitivos.");
          this.btnGuardar=false;
        });   
  }

  DesactivarConfTecnica(){
    this.confiactiva=false
    this.confRepetitivo.estatus=true;
    this.permitirActivarEstatus=true;
    this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
      //  this.modalActive.dismiss()
      if(response.objModResultado!=null){
        if(response.objModResultado.error){
          this.toastr.error("Ocurrió un error al desactivar la configuración técnica de repetitivos."); 
          this.btnGuardar=false;
        }
        if(!response.objModResultado.error){
          // this.toastr.success("Se activó la configuración técnica de repetitivos exitosamente.");
          this.btnGuardar=false;
          this.CargarConfRepetitivo(this.confTecnicaPrincipal)
        }
      }
      if(response.objModResultado==null){
        // this.toastr.success("Se activó la configuración técnica de repetitivos exitosamente.");
        this.btnGuardar=false;
      }
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al desactivar la configuración técnica de repetitivos.");
          this.btnGuardar=false;
        });   
  }

}
