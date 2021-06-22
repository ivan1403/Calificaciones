import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfAdiContComponent } from '../modal-conf-adi-cont/modal-conf-adi-cont.component';
import { ApiResult } from '../../../../models/common/apiResult';
import { ConftecnicaService } from '../../../../services/conftecnica.service';
import { ToastrService } from 'ngx-toastr';
import {ConfTecnica} from '../../../../models/confTecnica'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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


    ComentarioRequerido:boolean=false;
    OpcionRequerido:boolean=false;
    StoredProcedureRequerido:boolean=false;;
    ComentariosSobrepasa:boolean=false;
    comentarioLimite:number

    btnGuardar:boolean=false;

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
    this.confTecnicaService.CargarConfTecnica(confTecnicaMod.idConfTecnica).subscribe((confTecnica:ApiResult)=>{
    console.log( confTecnica.result);      
      if(confTecnica.result!=null){
      this.RegistroNuevo=false;
      this.confTecnica = confTecnica.result;    
      this.InputOpcion=this.confTecnica.opcion;
      this.InputComentario=this.confTecnica.comentario;
      this.InputStoredProcedure=this.confTecnica.storeProcedure;
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
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
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


    }

    ConfTecnicaGuardar(){
     // console.log(this.RegistroNuevo)
      this.ValidarForm()
      if(this.FormValido){
        this.btnGuardar=true;
        this.confTecnica.comentario=this.InputComentario;
        this.confTecnica.opcion=this.InputOpcion;
        this.confTecnica.storeProcedure=this.InputStoredProcedure;
        if(this.RegistroNuevo){
          //console.log(this.confTecnica)
          this.confTecnicaService.Guardar(this.confTecnica).then((response: ApiResult)=>{
            //this.modalActive.dismiss()

            this.RegistroNuevo=false;
            this.registroAgregado=true;
         //   this.estatusConfTecnica=false;
            this.toastr.success("Se agregó la configuración técnica exitosamente.");
            this.btnGuardar=false;
            }, error=> {
              console.log(error);
              this.toastr.error("Ocurrió un error al modificar la configuración técnica.");
              this.btnGuardar=false;
            });
        }
        if(!this.RegistroNuevo){
         // console.log(this.confTecnica)
          this.confTecnicaService.Modifica(this.confTecnica).then((response: ApiResult)=>{
            this.modalActive.dismiss()
            this.toastr.success("Se modificó la configuración técnica exitosamente.");
            }, error=> {
              console.log(error);
              this.toastr.error("Ocurrió un error al modificar la configuración técnica.");
            });
        }
      }
      else{
        this.toastr.error("Verifique los campos")
      }

    }





}
