import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { RefCond } from '../../../../models/refCond';
import {ProcesosComponent} from '../../../../modules/procesos/pages/procesos/procesos.component'
import { ToastrService } from 'ngx-toastr';

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

  @Output() evt = new EventEmitter<any>(); 

  ngOnInit(): void {
    this.CargarListaRefCond();
  //  this.tipo= this.refcondData.tipo

    
  }

  CargarListaRefCond(){
    this.refCondService.Cargar().subscribe((refCond:ApiResult)=>{
      this.reglasRefCond = refCond.result;

    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }

  onSelectRefCond(Regla:any){
    this.evt.emit(Regla)
    this.modalActive.dismiss();
  }



  CargarRefCondxDescripcion(descripcion:string){
    this.refCondService.CargarXDescripcion(descripcion).subscribe((refCond:ApiResult)=>{
      this.reglasRefCond = refCond.result;

    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }



}
