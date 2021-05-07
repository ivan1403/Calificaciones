import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paginador } from '../../../models/common/paginador';


@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnInit {

  constructor() { }

  @Input() paginador :Paginador;
  @Output()  evtPaginaSeleccionada : EventEmitter<number>= new EventEmitter();

  ngOnInit() {

  }

  paginaSeleccionada(pagina:number):void{

    if(pagina>0 && (this.paginador.last_page>=pagina)){

      this.evtPaginaSeleccionada.emit(pagina);
    }

  }
}
