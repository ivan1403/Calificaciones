import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialEjecucionComponent } from './modal-historial-ejecucion.component';

describe('ModalHistorialEjecucionComponent', () => {
  let component: ModalHistorialEjecucionComponent;
  let fixture: ComponentFixture<ModalHistorialEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialEjecucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistorialEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
