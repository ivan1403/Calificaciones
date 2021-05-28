import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {ModalSelRefComponent} from '../../modals/modal-sel-ref/modal-sel-ref.component';
import {ModalAddModTecComponent} from '../../modals/modal-add-mod-tec/modal-add-mod-tec.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalSelRefCondComponent} from '../../../../shared/modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import { Paginador } from '../../../../models/common/paginador';
import { ConftecnicaService } from '../../../../services/conftecnica.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';

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

  confTecnica:Array<any> = [];


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

   AbrirModalAddModTec() {
    const modalAddModTecComponent = this.modalService.open(ModalAddModTecComponent, {ariaLabelledBy: 'modal-basic-title',size: 'lg' , backdrop: 'static'});

    modalAddModTecComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {     

    });
  }

  CargarConfTecnica(pagina:number){
    this.confTecnicaService.Cargar(this.rpp, pagina).subscribe((confTecnica:ApiResult)=>{
      if(confTecnica.result!=null){
      this.confTecnica = confTecnica.result;
      this.paginador.inicializar(confTecnica.existeOtraPagina, pagina);
      console.log( this.confTecnica)
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

  
  evtPaginaSeleccionada(pagina) {
      this.CargarConfTecnica(pagina);
  }

}
