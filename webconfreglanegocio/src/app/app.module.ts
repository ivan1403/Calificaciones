// Core Module
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Main Component
import { AppComponent } from './app.component';

//Cometario
// Component Module
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


// Pages
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorComponent } from './helpers/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './shared/components/auth/auth.component';
// import { TreeModule } from 'ng2-tree';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalSelRefCondComponent } from './modules/procesos/modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import { ModalTareasComponent } from './modules/procesos/modals/modal-tareas/modal-tareas.component';
import { ModalVerLogComponent } from './modules/procesos/modals/modal-ver-log/modal-ver-log.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ModalSelRefCondComponent,
    ModalTareasComponent,
    ModalVerLogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    TreeModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorComponent, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'Color Admin | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
