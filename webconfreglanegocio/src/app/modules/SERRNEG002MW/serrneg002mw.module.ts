import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { SERRNEG002MWRoutingModule } from './serrneg002mw-routing.module';
import { Serrneg002mwComponent } from './pages/serrneg002mw/serrneg002mw.component';
import { ModalSelRefComponent } from './modals/modal-sel-ref/modal-sel-ref.component';
import { ModalAddModTecComponent } from './modals/modal-add-mod-tec/modal-add-mod-tec.component';
import { ModalConfAdiContComponent } from './modals/modal-conf-adi-cont/modal-conf-adi-cont.component';



@NgModule({
  declarations: [Serrneg002mwComponent, ModalSelRefComponent, ModalAddModTecComponent, ModalConfAdiContComponent],
  imports: [
    CommonModule,
    SERRNEG002MWRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule 
  ]
})
export class SERRNEG002MWModule { }
