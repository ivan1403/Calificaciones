import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';
import { Paginador } from '../../../../models/common/paginador';
import { RefCond } from '../../../../models/refCond';



@Component({
  selector: 'app-modal-sel-ref',
  templateUrl: './modal-sel-ref.component.html',
  styleUrls: ['./modal-sel-ref.component.css']
})
export class ModalSelRefComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
    private toastr: ToastrService , private refCondService:RefCondService) { }

    reglasRef:Array<RefCond> = [];
    reglarefCondSelected:any;
    InputBuscarRef:string;

    paginador = new Paginador()
    rpp =5;
    paginaActual = 1;

    SinBusqueda:boolean=true;

    @Output() evt = new EventEmitter<any>(); 

  ngOnInit(): void {
  }

  CargarListaRef(pagina:number){
    if(this.InputBuscarRef==undefined||this.InputBuscarRef==null){
      this.InputBuscarRef='';
    }
    this.refCondService.CargarRedXCond(this.InputBuscarRef,this.rpp, pagina).subscribe((ref:ApiResult)=>{
      if(ref.result!=null){

      this.SinBusqueda=false;  
      this.reglasRef = ref.result;
      this.paginador.inicializar(ref.existeOtraPagina, pagina);

      }
      else{this.reglasRef=[]}

    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }

  onSelectRef(Regla:any){

    this.evt.emit(Regla)
    this.modalActive.dismiss();
  }

  evtPaginaSeleccionada(pagina) {
    this.CargarListaRef(pagina);
  }



}
