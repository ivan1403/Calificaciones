import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';

const routes: Routes = [
  { path: '',component:CalificacionesComponent,data:{title:'Calificaciones'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionesRoutingModule { }
