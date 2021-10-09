import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
///comentario de prueba
// Home
import { AuthComponent } from './shared/components/auth/auth.component';
import { CalificacionesModule } from './modules/calificaciones/calificaciones.module';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'calificaciones',  loadChildren:  () => import('./modules/calificaciones/calificaciones.module').then(m => m.CalificacionesModule), data:{title: 'Calificaciones'}},
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
