import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
///comentario de prueba
// Home
import { AuthComponent } from './shared/components/auth/auth.component';

import { ProcesosModule } from './modules/SERRNEG001MW/procesos.module';
import { SERRNEG002MWModule } from './modules/SERRNEG002MW/serrneg002mw.module';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'SERRNEG001MW',  loadChildren:  () => import('./modules/SERRNEG001MW/procesos.module').then(m => m.ProcesosModule), data:{title: 'SERRNEG001MW'}},
  { path: 'SERRNEG002MW',  loadChildren:  () => import('./modules/SERRNEG002MW/serrneg002mw.module').then(m => m.SERRNEG002MWModule), data:{title: 'SERRNEG002MW'}}
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
