import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MonitorPolizaService } from '../../../../services/monitor-poliza.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';
import { Paginador } from '../../../../models/common/paginador';

@Component({
  selector: 'app-modal-sel-repetitivo',
  templateUrl: './modal-sel-repetitivo.component.html',
  styleUrls: ['./modal-sel-repetitivo.component.css']
})
export class ModalSelRepetitivoComponent implements OnInit {

  constructor(public modalActive: NgbActiveModal,private toastr: ToastrService,
    private monitorPolizaService:MonitorPolizaService ) { }

    paginador = new Paginador()
    rpp =5;
    paginaActual = 1;
  InputBuscarRepetitivo;
  AsientoRepe:any=[];

  SinBusqueda:boolean=true;


  @Output() evt = new EventEmitter<any>(); 
  ngOnInit(): void {
  //  this.CargarListaAsientos(1)
  }

  CargarListaAsientos(pagina:number){
    if(this.InputBuscarRepetitivo==undefined||this.InputBuscarRepetitivo==null){
      this.InputBuscarRepetitivo='';
    }
    this.monitorPolizaService.CargarAsientosRepetitivos(this.InputBuscarRepetitivo,this.rpp, pagina).subscribe((ref:ApiResult)=>{
      if(ref.result!=null){

      this.SinBusqueda=false;  
      this.AsientoRepe = ref.result;
      console.log(this.AsientoRepe)
       this.paginador.inicializar(ref.existeOtraPagina, pagina);

      }
      else{this.AsientoRepe=[]}

    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
  }

  onSelectAsiento(asiento:any){
    this.evt.emit(asiento)
    this.modalActive.dismiss();
  }  

  evtPaginaSeleccionada(pagina) {
    this.CargarListaAsientos(pagina);
  }

}
