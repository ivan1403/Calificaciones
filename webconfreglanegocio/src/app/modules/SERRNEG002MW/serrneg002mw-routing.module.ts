import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Serrneg002mwComponent } from './pages/serrneg002mw/serrneg002mw.component';

const routes: Routes = [
  { path: '',component:Serrneg002mwComponent,data:{title:'Configuración técnica'}},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SERRNEG002MWRoutingModule { }
