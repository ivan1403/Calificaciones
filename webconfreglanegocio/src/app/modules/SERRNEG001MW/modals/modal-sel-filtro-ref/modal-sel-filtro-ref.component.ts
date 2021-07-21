import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { RefCond } from '../../../../models/refCond';
import {ProcesosComponent} from '../../../../modules/SERRNEG001MW/pages/procesos/procesos.component'
import { ToastrService } from 'ngx-toastr';
import { Paginador } from '../../../../models/common/paginador';

@Component({
  selector: 'app-modal-sel-filtro-ref',
  templateUrl: './modal-sel-filtro-ref.component.html',
  styleUrls: ['./modal-sel-filtro-ref.component.css']
})
export class ModalSelFiltroRefComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
  private refCondService:RefCondService, private toastr: ToastrService  ) { }

  tipo:string; 

  reglasRefCond:Array<RefCond> = [];
  reglarefCondSelected:any;
  InputBuscarRefCond:string;

  paginador = new Paginador()
  rpp =5;
  paginaActual = 1;

  SinBusqueda:boolean=true;

  SelectEstatusProgramacion:any;

  @Output() evt = new EventEmitter<any>(); 

  ngOnInit(): void {
   this.SelectEstatusProgramacion=2;
  }

  CargarListaRefCond(pagina:number){
    console.log("aaa")
    if(this.InputBuscarRefCond==undefined||this.InputBuscarRefCond==null){
      this.InputBuscarRefCond='';
    }

    this.refCondService.CargarXDescripcionYEstatus(this.InputBuscarRefCond,this.SelectEstatusProgramacion,this.rpp, pagina).subscribe((refCond:ApiResult)=>{
      console.log(refCond)
      if(refCond.result!=null){
      this.SinBusqueda=false;  
      this.reglasRefCond = refCond.result;
      this.paginador.inicializar(refCond.existeOtraPagina, pagina);
      console.log(this.reglasRefCond)
      }
      else{this.reglasRefCond=[]}

    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }

  onSelectRefCond(Regla:any){
    console.log(Regla)
    if(Regla.estatusEjecucion==1){
      this.toastr.error("El elemento seleccionado no tiene tareas programadas");
    }
      this.evt.emit(Regla)  
      this.modalActive.dismiss();

  }

  evtPaginaSeleccionada(pagina) {
      this.CargarListaRefCond(pagina);
  }



}
