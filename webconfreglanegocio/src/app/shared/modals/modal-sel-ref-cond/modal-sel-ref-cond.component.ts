import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../services/ref-cond.service';
import { ApiResult } from '../../../models/common/apiResult';
import { RefCond } from '../../../models/refCond';
import {ProcesosComponent} from '../../../modules/SERRNEG001MW/pages/procesos/procesos.component'
import { ToastrService } from 'ngx-toastr';
import { Paginador } from '../../../models/common/paginador';

@Component({
  selector: 'app-modal-sel-ref-cond',
  templateUrl: './modal-sel-ref-cond.component.html',
  styleUrls: ['./modal-sel-ref-cond.component.css']
})
export class ModalSelRefCondComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
  private refCondService:RefCondService, private toastr: ToastrService  ) { }

  tipo:string; 

  reglasRefCond:Array<RefCond> = [];
  reglarefCondSelected:any;
  InputBuscarRefCond:string;
  modaltitulo:string;
  labelInputDescripcion:string;

  paginador = new Paginador()
  rpp =5;
  paginaActual = 1;

  SinBusqueda:boolean=true;

  tituloColRefReg='';

  @Output() evt = new EventEmitter<any>(); 

  ngOnInit(): void {
   
  }

  CargarListaRefCond(pagina:number){
    console.log("aaa")
    if(this.InputBuscarRefCond==undefined||this.InputBuscarRefCond==null){
      this.InputBuscarRefCond='';
    }
    // this.refCondService.CargarXDescripcion(this.InputBuscarRefCond,this.rpp, pagina).subscribe((refCond:ApiResult)=>{
    //   if(refCond.result!=null){
    //   this.SinBusqueda=false;  
    //   this.reglasRefCond = refCond.result;
    //   this.paginador.inicializar(refCond.existeOtraPagina, pagina);
    //   console.log(this.reglasRefCond)
    //   }
    //   else{this.reglasRefCond=[]}

    // }, error=> {
    //   if(typeof error==="object"){
    //     this.toastr.error("Ocurrió un error al conectarse al servidor.");
    //   } else {
    //     this.toastr.error(error);
    //   }
    // });
    this.refCondService.CargarXFiltro(this.InputBuscarRefCond,this.rpp, pagina).subscribe((refCond:ApiResult)=>{
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
    this.evt.emit(Regla)
    this.modalActive.dismiss();
  }

  evtPaginaSeleccionada(pagina) {
      this.CargarListaRefCond(pagina);
  }



}
