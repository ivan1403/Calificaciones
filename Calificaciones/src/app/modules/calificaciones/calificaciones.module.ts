import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionesRoutingModule } from './calificaciones-routing.module';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { ModalExportarComponent } from './modals/modal-exportar/modal-exportar.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CalificacionesComponent, ModalExportarComponent],
  imports: [
    CommonModule,
    CalificacionesRoutingModule,
    ChartsModule,
    FormsModule
  ]
})
export class CalificacionesModule { }
