import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcesosComponent } from './pages/procesos/procesos.component';


const routes: Routes = [
  { path: '',component:ProcesosComponent,data:{title:'SERRNEG001MW'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
