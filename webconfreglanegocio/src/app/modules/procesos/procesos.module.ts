import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { Routes } from '@angular/router';
import { ProcesosComponent } from './pages/procesos/procesos.component';

const routes: Routes = [
  { path: '',component:ProcesosComponent,data:{title:'Procesos'}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProcesosRoutingModule
  ]
})
export class ProcesosModule { }
