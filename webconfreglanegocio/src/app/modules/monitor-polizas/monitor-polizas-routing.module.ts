import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorPolizasComponent } from './pages/monitor-polizas/monitor-polizas.component'

const routes: Routes = [
  { path: '',component:MonitorPolizasComponent,data:{title:'Monitor Polizas'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorPolizasRoutingModule { }
