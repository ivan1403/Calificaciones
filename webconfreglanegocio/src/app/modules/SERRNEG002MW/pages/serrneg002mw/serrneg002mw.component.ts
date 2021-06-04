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
  busquedaFiltrada:boolean=false;

  confTecnica:Array<ConfTecnica> = [];

  InputSelReferencia:string;
  InputSelRegCond:string;

  regCondSelected:any;
  reRefSelected:any;
  //@Output() evt = new EventEmitter<any>(); 

  ngOnInit(): void {
   this.CargarConfTecnica(1);
  }

  AbrirModalRefencia(){
    const modalSelRefComponent = this.modalService.open(ModalSelRefComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    modalSelRefComponent.componentInstance.evt.subscribe(arg=>{
      //console.log(arg)
      this.CargarRefSelected(arg)
    })
    modalSelRefComponent.result.then((result) => {
      console.log(result);
    }, (reason) => {

    });
  }
  
  AbrirModalSelRegCond() {
     const modalSelRegCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
     modalSelRegCondComponent.componentInstance.modaltitulo="Busqueda Regla / Condición"
     modalSelRegCondComponent.componentInstance.labelInputDescripcion="Regla / Condición"
     modalSelRegCondComponent.componentInstance.evt.subscribe(arg=>{
      this.CargarRegCondSelected(arg)
    })
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
      this.CargarConfTecnica(1)
    });
    const ConfTecClone = JSON.parse(JSON.stringify(confTecnica));
    modalAddModTecComponent.componentInstance.CargarConfTecModificar(ConfTecClone);
  }

    CargarConfTecnica(pagina:number){
      this.busquedaFiltrada=false;
      console.log(this.regCondSelected)
      if(this.regCondSelected!=undefined || this.reRefSelected!=undefined){
        this.BuscarConfTecnicas(pagina)
      }
      
      if(this.regCondSelected==undefined || this.reRefSelected==undefined){ 
        this.confTecnicaService.Cargar(this.rpp, pagina).subscribe((confTecnica:ApiResult)=>{
          if(confTecnica.result!=null){
          this.confTecnica = confTecnica.result;
          this.paginador.inicializar(confTecnica.existeOtraPagina, pagina);      
          }
          else{
            this.confTecnica=[]
          }
        }, error=> {
          if(typeof error==="object"){
            this.toastr.error("Ocurrio un error al conectarse al servidor.");
          } else {
            this.toastr.error(error);
          }
        }); 
      }
  }

  onChangeConfiguracionActiva(e,confTecnica){
    if(e.target.checked){
      confTecnica.estatus=false
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

  CargarRegCondSelected(relgaRefCond:any){  
    this.regCondSelected=relgaRefCond
  //  console.log(relgaRefCond)
      if(this.regCondSelected.nombreCondicion!=undefined){
        this.InputSelRegCond=this.regCondSelected.nombreCondicion+ ' / ' +this.regCondSelected.referenciaCondicion
        this.InputSelReferencia=null;
        this.reRefSelected=undefined;
      }            
    }

  CargarRefSelected(relgaRef:any){  
    this.reRefSelected=relgaRef
      if(this.reRefSelected.referencia!=undefined){
        this.InputSelReferencia=this.reRefSelected.referencia
        this.InputSelRegCond=null;
        this.regCondSelected=undefined;
      }
    }

  BuscarConfTecnicas(pagina:number){
    this.busquedaFiltrada=true;
    this.confTecnica=[]
    if(this.regCondSelected!=undefined){
      //console.log(this.regCondSelected.idCondicion)
      this.confTecnicaService.CargarXCondicion(this.regCondSelected.idCondicion,this.rpp, pagina).subscribe((confTecnica:ApiResult)=>{
        if(confTecnica.result!=null){
        this.confTecnica = confTecnica.result;
        this.paginadorFiltrado.inicializar(confTecnica.existeOtraPagina, pagina);        
        }
        else{this.confTecnica=[]}
      }, error=> {
        if(typeof error==="object"){
          this.toastr.error("Ocurrio un error al conectarse al servidor.");
        } else {
          this.toastr.error(error);
        }
      }); 

    }
    if(this.reRefSelected!=undefined){
    //  console.log(this.reRefSelected.idCondicion)
        this.confTecnicaService.CargarXCondicion(this.reRefSelected.idCondicion,this.rpp, pagina).subscribe((confTecnica:ApiResult)=>{
          if(confTecnica.result!=null){
          this.confTecnica = confTecnica.result;
          this.paginadorFiltrado.inicializar(confTecnica.existeOtraPagina, pagina);          
          }
          else{this.confTecnica=[]}
        }, error=> {
          if(typeof error==="object"){
            this.toastr.error("Ocurrio un error al conectarse al servidor.");
          } else {
            this.toastr.error(error);
          }
        }); 
    }
  }

  LimpiarFiltro(){
    this.InputSelReferencia=null;
    this.reRefSelected=undefined;
    this.InputSelRegCond=null;
    this.regCondSelected=undefined;
    this.CargarConfTecnica(1);
  }
}
