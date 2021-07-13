import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfAdiContComponent } from '../modal-conf-adi-cont/modal-conf-adi-cont.component';
import { ApiResult } from '../../../../models/common/apiResult';
import { ConftecnicaService } from '../../../../services/conftecnica.service';
import { ToastrService } from 'ngx-toastr';
import {ConfTecnica} from '../../../../models/confTecnica'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import  Swal  from 'sweetalert2'

@Component({
  selector: 'app-modal-add-mod-tec',
  templateUrl: './modal-add-mod-tec.component.html',
  styleUrls: ['./modal-add-mod-tec.component.css']
})
export class ModalAddModTecComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
    private confTecnicaService:ConftecnicaService, private toastr: ToastrService) { }

    RegistroNuevo:boolean=false;
    confTecnicaNueva:any= new ConfTecnica;
    confTecnica:any= new ConfTecnica;

    InputStoredProcedure:string;
    InputOpcion:number;
    InputComentario:string;
    SelectFuncionalidad;

    InputRadioEstatusTransaccion
    
    IdEncRepetitivo;
    
    ComentarioRequerido:boolean=false;
    OpcionRequerido:boolean=false;
    StoredProcedureRequerido:boolean=false;;
    ComentariosSobrepasa:boolean=false;
    comentarioLimite:number
    OpcionRadios:boolean=false;;

    btnGuardar:boolean=false;

    hayCambios:boolean;
   // estatusConfTecnica:boolean;

    FormValido=true;

    registroAgregado=false;

  ngOnInit(): void {
  }

  AbrirModalConfAdiCont(){
 
    const modalConfAdiCont = this.modalService.open(ModalConfAdiContComponent, {ariaLabelledBy: 'modal-basic-title',windowClass : "modalSize" , backdrop: 'static'});
    modalConfAdiCont.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });    
    const ConfTecClone = JSON.parse(JSON.stringify(this.confTecnica));
    modalConfAdiCont.componentInstance.CargarConfRepetitivo(ConfTecClone);
  
  }

  CargarConfTecModificar(confTecnicaMod){
    console.log(confTecnicaMod)
    this.IdEncRepetitivo=confTecnicaMod.idEncRepetitivo
    this.confTecnicaService.CargarConfTecnica(confTecnicaMod.idConfTecnica).subscribe((confTecnica:ApiResult)=>{
    console.log( confTecnica.result);      
      if(confTecnica.result!=null){
      this.RegistroNuevo=false;
      this.confTecnica = confTecnica.result;    
      this.InputOpcion=this.confTecnica.opcion;
      this.InputComentario=this.confTecnica.comentario;
      this.InputStoredProcedure=this.confTecnica.storeProcedure;
      if(this.confTecnica.estatusTransaccion==false){this.InputRadioEstatusTransaccion='0'}
      if(this.confTecnica.estatusTransaccion==true){this.InputRadioEstatusTransaccion='1'}
      console.log(this.InputRadioEstatusTransaccion)
      this.registroAgregado=true;
     // this.estatusConfTecnica=false;
      }
      if(confTecnica.result==null){
        this.RegistroNuevo=true;
        this.registroAgregado=false;
        this.confTecnica = confTecnicaMod;
        //this.estatusConfTecnica=true;
      }
    }, error=> {
     console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });   
  }

    ValidarForm(){
      this.FormValido=true;
      this.ComentarioRequerido=false;
      this.ComentariosSobrepasa=false;
      this.OpcionRequerido=false;
      this.StoredProcedureRequerido=false;
      this.OpcionRadios=false;

      if(this.InputComentario==undefined ||this.InputComentario==null || this.InputComentario.trim()==''){
        this.FormValido=false;
        this.ComentarioRequerido=true;
      }
      if(this.InputComentario!=undefined){
        if(this.InputComentario.length>500 )
        {
          this.FormValido=false;
          this.ComentariosSobrepasa=true;
          this.comentarioLimite=this.InputComentario.length-500
        }
      } 
      if(this.InputOpcion==undefined ||this.InputOpcion==null){
        this.FormValido=false;
        this.OpcionRequerido=true;
      }
      if(this.InputStoredProcedure==undefined ||this.InputStoredProcedure==null || this.InputStoredProcedure.trim()==''){
        this.FormValido=false;
        this.StoredProcedureRequerido=true;
      }
      if(this.InputRadioEstatusTransaccion==undefined || this.InputRadioEstatusTransaccion==null ){
        this.OpcionRadios=true;
        this.FormValido=false;
      }
       console.log(this.InputRadioEstatusTransaccion)
          // this.FormValido=false;

    }

    ConfTecnicaGuardar(){
     // console.log(this.RegistroNuevo)
      this.ValidarForm()
      if(this.FormValido){
        this.btnGuardar=true;
        this.confTecnica.comentario=this.InputComentario;
        this.confTecnica.opcion=this.InputOpcion;
        this.confTecnica.storeProcedure=this.InputStoredProcedure;
        this.confTecnica.idEncRepetitivo=this.IdEncRepetitivo;
        
        this.confTecnica.estatusTransaccion=this.InputRadioEstatusTransaccion;
        if(this.confTecnica.estatusTransaccion==0){this.confTecnica.estatusTransaccion=false}
        if(this.confTecnica.estatusTransaccion==1){this.confTecnica.estatusTransaccion=true}
        console.log( this.confTecnica)
        if(this.RegistroNuevo){
          //console.log(this.confTecnica)
          this.confTecnicaService.Guardar(this.confTecnica).then((response: ApiResult)=>{
            //this.modalActive.dismiss()

            this.RegistroNuevo=false;
            this.registroAgregado=true;
         //   this.estatusConfTecnica=false;
         console.log(response)
            if(response.objModResultado.error){
              this.toastr.error("Ocurrió un error al guardar la configuración técnica.");
              this.btnGuardar=false;
              this.RegistroNuevo=true;
            }
            if(!response.objModResultado.error){
              this.toastr.success("Se agregó la configuración técnica exitosamente.");
              this.btnGuardar=false;
              this.RegistroNuevo=false;
            }

            }, error=> {
              console.log(error);
              this.toastr.error("Ocurrió un error al guardar la configuración técnica.");
              this.btnGuardar=false;
              this.RegistroNuevo=true;
            });
        }
        if(!this.RegistroNuevo){
         // console.log(this.confTecnica)
          this.confTecnicaService.Modifica(this.confTecnica).then((response: ApiResult)=>{
            this.modalActive.dismiss()
            console.log(response)
            if(response.objModResultado!=null){
              if(response.objModResultado.error){
                this.toastr.error("Ocurrió un error al guardar la configuración técnica.");
                this.btnGuardar=false;
              }
              if(!response.objModResultado.error){
                this.toastr.success("Se actualizó la configuración técnica exitosamente.");
                this.btnGuardar=false;
              }
            }
            if(response.objModResultado==null){
              this.toastr.success("Se actualizó la configuración técnica exitosamente.");
                this.btnGuardar=false;
            }
            }, error=> {
              console.log(error);
              this.toastr.error("Ocurrió un error al guardar la configuración técnica.");
              this.btnGuardar=false;
            });
        }
      }
      else{
        this.toastr.error("Verifique los campos")
      }

    }

    CerrarModalAddMod(){
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

      // this.confTecnica.comentario=this.InputComentario;
      // this.confTecnica.opcion=this.InputOpcion;
      // this.confTecnica.storeProcedure=this.InputStoredProcedure;   
      // this.confTecnica.estatusTransaccion=this.InputRadioEstatusTransaccion;

      if( this.InputComentario!=this.confTecnica.comentario){
        this.hayCambios=true;
      }
      if( this.InputOpcion!=this.confTecnica.opcion){
        this.hayCambios=true;
      }
      if( this.InputStoredProcedure!=this.confTecnica.storeProcedure){
        this.hayCambios=true;
      }
      if( this.InputRadioEstatusTransaccion!=this.confTecnica.estatusTransaccion){
        this.hayCambios=true;
      }


  
    }



}
