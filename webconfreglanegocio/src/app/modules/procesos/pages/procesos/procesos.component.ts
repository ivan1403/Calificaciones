import { Component, OnInit,Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalSelRefCondComponent} from '../../modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import {ModalVerLogComponent} from '../../modals/modal-ver-log/modal-ver-log.component';
import {ModalTareasComponent} from '../../modals/modal-tareas/modal-tareas.component';
import { ProcesoService } from '../../../../services/proceso.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { Proceso } from '../../../../models/proceso';
import { RefCondDataService } from '../../../../services/ref-cond-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
public page=1;
public pageSize=5;


  constructor(private modalService: NgbModal, private procesoService:ProcesoService,
    private refcondData:RefCondDataService, private toastr: ToastrService) { }

  reglarefCondSelected:any;
  checkboxpEliminarProgramacion:boolean=false;

  procesos:Array<Proceso> = [];
  
  InputSelRefCond:string;

  ngOnInit(): void {
    this.CargarProcesos();     
  }

  CargarProcesos(){
    this.procesoService.Cargar().subscribe((proceso:ApiResult)=>{
      console.log(proceso.result)
      if(proceso.result!=null){
      this.procesos = proceso.result;
     console.log('entro' +this.procesos);
      }
      else{this.procesos=[]}
    //  console.log(this.procesos);

    }, error=> {
      console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrio un error al conectarse al servidor.");
        console.error('obtenerPolizas()',error);
      } else {
        this.toastr.error(error);
      }
    });
 
  }

  abrirModalSelRefCond() {
    this.refcondData.SelectTipo("Buscar");
   
    const modalSelRefCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});

    modalSelRefCondComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
      this.CargarRefCondSelected()
    });
  }

  abrirModalVerLog() {  

  
    const modalVerLogCondComponent = this.modalService.open(ModalVerLogComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    
    modalVerLogCondComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }

  abrirModalTareas() {

    const modalTareasComponent = this.modalService.open(ModalTareasComponent, {ariaLabelledBy: 'modal-basic-title', windowClass : "modalSize",  backdrop: 'static'});
     modalTareasComponent.componentInstance.inputAbrirModalSelRefCond=true;
     modalTareasComponent.componentInstance.btnAbrirModalSelRefCond=false;
    modalTareasComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
      this.CargarProcesos();
    });
  }

  abrirEditModalTareas() {

    // const modalTareasComponent = this.modalService.open(ModalTareasComponent, {ariaLabelledBy: 'modal-basic-title', windowClass : "modalSize" , backdrop: 'static'});

    // modalTareasComponent.result.then((result) => {
    //   console.log(result);
    // }, (reason) => {
    // });
  }

  onChangeProgramacionCalendarizada(e) {
    if(e.target.checked){
      console.log(e.target.id+' esta prendido')
    }
    else{
      console.log(e.target.id+' esta apagado')
    }    

  }

  onChangeEliminarProgramacion(e) {
    if(e.target.checked){
      console.log(e.target.id+' esta prendido')
    }
    else{
      console.log(e.target.id+' esta apagado')
    }    
  }

  CargarRefCondSelected(){
  
    this.refcondData.reglaRefCond.subscribe(reglarefCondSelected=>this.reglarefCondSelected=reglarefCondSelected)
  //  console.log(this.reglarefCondSelected)
    if(this.reglarefCondSelected.nombreCondicion!=undefined)
    this.InputSelRefCond=this.reglarefCondSelected.nombreCondicion+ ' / ' +this.reglarefCondSelected.referenciaCondicion

  }

  
  CargarTareasFiltrada(){
    if(this.reglarefCondSelected!=undefined){
      // console.log(this.reglarefCondSelected.idCondicion)

      this.procesoService.CargarXId(this.reglarefCondSelected.idCondicion).subscribe((proceso:ApiResult)=>{
        if(proceso.result!=null){
        this.procesos = proceso.result;
      //  console.log(this.procesos);
        }
        else{this.procesos=[]}
      }, error=> {
        console.log(error);
      });

    }
  }
  
}
