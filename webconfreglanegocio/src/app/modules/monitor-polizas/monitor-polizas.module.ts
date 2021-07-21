import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { MonitorPolizasRoutingModule } from './monitor-polizas-routing.module';
import { MonitorPolizasComponent } from './pages/monitor-polizas/monitor-polizas.component';
import { ModalSelRepetitivoComponent } from './modals/modal-sel-repetitivo/modal-sel-repetitivo.component';
import { ModalHistorialEjecucionComponent } from './modals/modal-historial-ejecucion/modal-historial-ejecucion.component';
import { ModalInfoOrigenComponent } from './modals/modal-info-origen/modal-info-origen.component';



@NgModule({
  declarations: [MonitorPolizasComponent, ModalSelRepetitivoComponent, ModalHistorialEjecucionComponent, ModalInfoOrigenComponent],
  imports: [
    CommonModule,
    MonitorPolizasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule 
  ]
})
export class MonitorPolizasModule { }
