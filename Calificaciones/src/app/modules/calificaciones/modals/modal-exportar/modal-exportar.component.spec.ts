import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExportarComponent } from './modal-exportar.component';

describe('ModalExportarComponent', () => {
  let component: ModalExportarComponent;
  let fixture: ComponentFixture<ModalExportarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExportarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
