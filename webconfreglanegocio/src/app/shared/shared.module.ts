import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as global from '../config/globals';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './components/panel/panel.component';
import { FloatSubMenuComponent } from './components/float-sub-menu/float-sub-menu.component';
import { ToastrModule } from 'ngx-toastr';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { ModalVerLogComponent } from './modals/modal-ver-log/modal-ver-log.component';
import { FechaEspanolPipe } from './components/fechaEspanol/fecha-espanol.pipe';
import { FechaHrEspanolPipe } from './components/fechaEspanol/fecha-hr-espanol.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,
    PaginadorComponent,
    ModalVerLogComponent,
    FechaEspanolPipe,
    FechaHrEspanolPipe,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ Title,{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,
    PaginadorComponent,
    ReactiveFormsModule,
    FechaEspanolPipe,
    FechaHrEspanolPipe,
  ],

})
export class SharedModule { }
