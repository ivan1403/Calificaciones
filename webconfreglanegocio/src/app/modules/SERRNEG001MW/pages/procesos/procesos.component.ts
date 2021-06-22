import { Component, OnInit,Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalSelRefCondComponent} from '../../../../shared/modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import {ModalVerLogComponent} from '../../../../shared/modals/modal-ver-log/modal-ver-log.component';
import {ModalTareasComponent} from '../../modals/modal-tareas/modal-tareas.component';
import { ProcesoService } from '../../../../services/proceso.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { Proceso } from '../../../../models/proceso';
import { ToastrService } from 'ngx-toastr';
import { PaginadorComponent } from '../../../../shared/components/paginador/paginador.component';
import { Paginador } from '../../../../models/common/paginador';
import { ModalSelRefComponent } from '../../../SERRNEG002MW/modals/modal-sel-ref/modal-sel-ref.component';



@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {
// public page=1;
// public pageSize=5;

paginador = new Paginador()
paginadorFiltrado = new Paginador()
rpp = 10;
paginaActual = 1;
procesosFiltrados:boolean;

  constructor(private modalService: NgbModal, private procesoService:ProcesoService,
     private toastr: ToastrService) { }

  reglarefCondSelected:any;
  checkboxpEliminarProgramacion:boolean=false;

  procesos:Array<Proceso> = [];
  
  InputSelRefCond:string;
  //lol:string;
  ngOnInit(): void {
    this.CargarProcesos(1);  
    
    this.procesosFiltrados=false; 
  }


  CargarProcesos(pagina:number){
    this.procesosFiltrados=false;
    this.procesoService.Cargar(this.rpp, pagina).subscribe((proceso:ApiResult)=>{
     // console.log(proceso)
      if(proceso.objModResultado!=null){
        if(proceso.objModResultado.error)
        {
          this.toastr.error("Ocurrió un error al conectarse al servidor.");
        }
      }
      if(proceso.result!=null){
      this.procesos = proceso.result;
 //   console.log(this.procesos)
      this.paginador.inicializar(proceso.existeOtraPagina, pagina);
      }
      else{this.procesos=[]}
     // console.log(this.procesos);

    }, error=> {
   //   console.log(error);
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    }); 
  }

  abrirModalSelRefCond() {
   // this.refcondData.SelectTipo("Buscar");
 
    const modalSelRefCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    modalSelRefCondComponent.componentInstance.modaltitulo="Búsqueda Referencia / Condición"
    modalSelRefCondComponent.componentInstance.labelInputDescripcion="Referencia / Condición"
    modalSelRefCondComponent.componentInstance.tituloColRefReg="Referencia";
    modalSelRefCondComponent.componentInstance.evt.subscribe(arg=>{
      //console.log(arg)
      this.CargarRefCondSelected(arg)
    })
    modalSelRefCondComponent.result.then((result) => {
   //   console.log(result);
    }, (reason) => {

    

    });
  }

  abrirModalVerLog() {  

  
    const modalVerLogCondComponent = this.modalService.open(ModalVerLogComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    
    modalVerLogCondComponent.result.then((result) => {
     // console.log(result);
    }, (reason) => {
    });
  }

  abrirModalTareas() {

    const modalTareasComponent = this.modalService.open(ModalTareasComponent, {ariaLabelledBy: 'modal-basic-title', windowClass : "modalSize",  backdrop: 'static'});
     modalTareasComponent.componentInstance.inputAbrirModalSelRefCond=true;
     modalTareasComponent.componentInstance.btnAbrirModalSelRefCond=false;

    modalTareasComponent.result.then((result) => {
     // console.log(result);
    }, (reason) => {
      this.CargarProcesos(1);
    });
  }

  abrirEditModalTareas(proceso:any) {

    const modalTareasComponent = this.modalService.open(ModalTareasComponent, {ariaLabelledBy: 'modal-basic-title', windowClass : "modalSize" , backdrop: 'static'});

    modalTareasComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    const procesoClone = JSON.parse(JSON.stringify(proceso));
    modalTareasComponent.componentInstance.ModificarDatos(procesoClone);

  }

  onChangeProgramacionCalendarizada(e) {
    if(e.target.checked){
      console.log(e.target.id+' esta prendido')
    }
    else{
      console.log(e.target.id+' esta apagado')
    }    

  }

  onChangeEliminarProgramacion(e,procesoselect) {
    if(e.target.checked){
      this.procesoService.EstatusProgramacion(procesoselect).then((response: ApiResult)=>{
        this.toastr.success("Se activó la programación de "+procesoselect.comentario+' de condición '+procesoselect.descripcionCondicion+'.');
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al activar la tarea.");
      });
    }
    else{   
      this.procesoService.EstatusProgramacion(procesoselect).then((response: ApiResult)=>{
        this.toastr.success("Se desactivó la programación de "+procesoselect.comentario+' de condición '+procesoselect.descripcionCondicion+'.');
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al desactivar la tarea.");
      });
    }    
  }

  CargarRefCondSelected(relgaRefCond:any){  
  this.reglarefCondSelected=relgaRefCond
    if(this.reglarefCondSelected.nombreCondicion!=undefined)
    this.InputSelRefCond=this.reglarefCondSelected.referencia+ ' / ' +this.reglarefCondSelected.nombreCondicion

  }

  
  CargarTareasFiltrada(pagina:number){
  //  console.log(this.reglarefCondSelected)
    if(this.reglarefCondSelected!=undefined){
      this.procesosFiltrados=true;
      this.procesoService.CargarXId(this.reglarefCondSelected.idCondicion,this.rpp, pagina).subscribe((proceso:ApiResult)=>{
        if(proceso.objModResultado!=null){
          if(proceso.objModResultado.error)
          {
            this.toastr.error("Ocurrió un error al conectarse al servidor.");
          }
        }
        if(proceso.result!=null){
        this.procesos = proceso.result;
        this.paginadorFiltrado.inicializar(proceso.existeOtraPagina, pagina);
      //  console.log(this.procesos);
        }
        else{this.procesos=[]}
      }, error=> {
        if(typeof error==="object"){
          this.toastr.error("Ocurrió un error al conectarse al servidor.");
        } else {
          this.toastr.error(error);
        }
      });

    }
  }

  evtPaginaSeleccionada(pagina) {
    if(!this.procesosFiltrados){
      this.CargarProcesos(pagina);
    }
    else{

      this.CargarTareasFiltrada(pagina)
    }
  }

  LimpiarFiltro(){
    this.reglarefCondSelected=undefined
    this.InputSelRefCond=''
    this.CargarProcesos(1)

  }
  
}
