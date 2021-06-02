import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {ModalSelRefComponent} from '../../modals/modal-sel-ref/modal-sel-ref.component';
import {ModalAddModTecComponent} from '../../modals/modal-add-mod-tec/modal-add-mod-tec.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalSelRefCondComponent} from '../../../../shared/modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import { Paginador } from '../../../../models/common/paginador';
import { ConftecnicaService } from '../../../../services/conftecnica.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';
import {ConfTecnica} from '../../../../models/confTecnica'

@Component({
  selector: 'app-serrneg002mw',
  templateUrl: './serrneg002mw.component.html',
  styleUrls: ['./serrneg002mw.component.css']
})
export class Serrneg002mwComponent implements OnInit {

  constructor(private modalService: NgbModal,private confTecnicaService:ConftecnicaService, private toastr: ToastrService) { }

  paginador = new Paginador()
  paginadorFiltrado = new Paginador()
  rpp = 10;
  paginaActual = 1;

  confTecnica:Array<ConfTecnica> = [];

  InputSelReferencia:string;
  InputSelRegCond:string;

  ngOnInit(): void {
   this.CargarConfTecnica(1);
  }

  AbrirModalRefencia(){
       
    const modalSelRefComponent = this.modalService.open(ModalSelRefComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    modalSelRefComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {

    });
  }
  
  AbrirModalSelRegCond() {
     const modalSelRegCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
     modalSelRegCondComponent.componentInstance.modaltitulo="Busqueda Regla / Condición"
     modalSelRegCondComponent.componentInstance.labelInputDescripcion="Regla / Condición"
     modalSelRegCondComponent.result.then((result) => {
       console.log(result);
     }, (reason) => {     
 
     });
   }

   AbrirModalAddModTec(confTecnica) {
    const modalAddModTecComponent = this.modalService.open(ModalAddModTecComponent, {ariaLabelledBy: 'modal-basic-title',size: 'lg' , backdrop: 'static'});

    modalAddModTecComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {     

    });
    const ConfTecClone = JSON.parse(JSON.stringify(confTecnica));
    modalAddModTecComponent.componentInstance.CargarConfTecModificar(ConfTecClone);
  }

    CargarConfTecnica(pagina:number){
    this.confTecnicaService.Cargar(this.rpp, pagina).subscribe((confTecnica:ApiResult)=>{
      if(confTecnica.result!=null){
      this.confTecnica = confTecnica.result;
      this.paginador.inicializar(confTecnica.existeOtraPagina, pagina);
      
      }
      else{this.confTecnica=[]}
     // console.log(this.procesos);

    }, error=> {
   //   console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    }); 
  }

  onChangeConfiguracionActiva(e,confTecnica){
    if(e.target.checked){
      confTecnica.estatus=false
//console.log(confTecnica)
      this.confTecnicaService.Modifica(confTecnica).then((response: ApiResult)=>{
        this.toastr.success("Se activó la configuración de "+confTecnica.comentario+'de condición '+confTecnica.descripcionCondicion+'.');
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al activar la tarea.");
      });
    }
    else{   
      confTecnica.estatus=true
  //    console.log(confTecnica)
      this.confTecnicaService.Modifica(confTecnica).then((response: ApiResult)=>{
        this.toastr.success("Se desactivó la configuración de "+confTecnica.comentario+'de condición '+confTecnica.descripcionCondicion+'.');
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al desactivar la tarea.");
      });
    }   
  }

  
  evtPaginaSeleccionada(pagina) {
      this.CargarConfTecnica(pagina);
  }

}
