import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { MonitorPolizasRoutingModule } from './monitor-polizas-routing.module';
import { MonitorPolizasComponent } from './pages/monitor-polizas/monitor-polizas.component';
import { ModalSelRepetitivoComponent } from './modals/modal-sel-repetitivo/modal-sel-repetitivo.component';
import { ModalSelInfoOrigenComponent } from './modals/modal-sel-info-origen/modal-sel-info-origen.component';


@NgModule({
  declarations: [MonitorPolizasComponent, ModalSelRepetitivoComponent, ModalSelInfoOrigenComponent],
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
