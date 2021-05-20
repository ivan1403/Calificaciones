import { Component, OnInit, Input } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { RefCond } from '../../../../models/refCond';
import {ProcesosComponent} from '../../../../modules/procesos/pages/procesos/procesos.component'
import { RefCondDataService } from '../../../../services/ref-cond-data.service';

@Component({
  selector: 'app-modal-sel-ref-cond',
  templateUrl: './modal-sel-ref-cond.component.html',
  styleUrls: ['./modal-sel-ref-cond.component.css']
})
export class ModalSelRefCondComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal,
  private refCondService:RefCondService, private refcondData:RefCondDataService,  ) { }

  tipo:string;

  reglasRefCond:Array<RefCond> = [];
  reglarefCondSelected:any;
  selRefCond:string;


  ngOnInit(): void {
    this.CargarListaRefCond();
    this.tipo= this.refcondData.tipo

    
  }

  CargarListaRefCond(){
    this.refCondService.Cargar().subscribe((refCond:ApiResult)=>{
      this.reglasRefCond = refCond.result;

    }, error=> {
      console.log(error);
    });
  }

  onSelectRefCond(Regla:any){
    if(this.tipo=="Buscar"){
      this.refcondData.reglaRefCond.subscribe(reglarefCondSelected=>this.reglarefCondSelected=reglarefCondSelected)
      this.refcondData.SelectRegla(Regla);   
      this.modalActive.dismiss();
    } 
    if(this.tipo=="Nueva"){
      this.refcondData.reglaRefCondNueva.subscribe(reglarefCondSelected=>this.reglarefCondSelected=reglarefCondSelected)
      this.refcondData.SelectReglaNueva(Regla);   
      this.modalActive.dismiss();
      
    }  
  }



  CargarRefCondxDescripcion(descripcion:string){
    this.refCondService.CargarXDescripcion(descripcion).subscribe((refCond:ApiResult)=>{
      this.reglasRefCond = refCond.result;

    }, error=> {
      console.log(error);
    });
  }



}
