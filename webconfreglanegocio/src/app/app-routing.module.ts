import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
///comentario de prueba
// Home
import { AuthComponent } from './shared/components/auth/auth.component';

import { ProcesosModule } from './modules/procesos/procesos.module';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'procesos',  loadChildren:  () => import('./modules/procesos/procesos.module').then(m => m.ProcesosModule), data:{title: 'Procesos'}}
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
