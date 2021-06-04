import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResult } from '../../../../models/common/apiResult';
import { ConfTecRepetitivoService } from '../../../../services/conf-tec-repetitivo.service';
import { ToastrService } from 'ngx-toastr';
import {confRepetitivo} from '../../../../models/confRepetitivo'

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
    this.confTecRepetitivoService.Cargar(confRepetitivoMod.idConfTecnica).subscribe((confTecnica:ApiResult)=>{

      if(confTecnica.result!=null){
      this.confRepetitivo=confTecnica.result;
      this.registroNuevo=false;
      this.InputStoreProcedure=this.confRepetitivo.storeProcedure;
      this.InputOpcion=this.confRepetitivo.opcion;
      this.InputIntentoPoliza=this.confRepetitivo.numeroIntentos;
      this.InputIdPlantilla=this.confRepetitivo.idEncConfPlantilla;
      this.InputIdPrueba=this.confRepetitivo.spIdPrueba;
      }
      if(confTecnica.result==null){
      // this.confRepetitivo=confTecnica.result;
      this.registroNuevo=true;
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
      if(this.registroNuevo){
         this.confRepetitivo.idConfTecnica=this.idConfTecnica
         this.confTecRepetitivoService.Guardar(this.confRepetitivo).then((response: ApiResult)=>{
           this.modalActive.dismiss()
           this.toastr.success("Se agregó la configuración técnica de repetitivos exitosamente.");
           }, error=> {
             console.log(error);
             this.toastr.error("Ocurrió un error al agregar la configuración técnica de repetitivos.");
           });   
       }
       else{
        this.confTecRepetitivoService.Modificar(this.confRepetitivo).then((response: ApiResult)=>{
        this.modalActive.dismiss()
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
}
