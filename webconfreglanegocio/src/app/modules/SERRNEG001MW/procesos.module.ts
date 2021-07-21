import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './pages/procesos/procesos.component';
import { ModalSelFiltroRefComponent } from './modals/modal-sel-filtro-ref/modal-sel-filtro-ref.component';

@NgModule({
  declarations: [ProcesosComponent, ModalSelFiltroRefComponent ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ]
})
export class ProcesosModule { }
