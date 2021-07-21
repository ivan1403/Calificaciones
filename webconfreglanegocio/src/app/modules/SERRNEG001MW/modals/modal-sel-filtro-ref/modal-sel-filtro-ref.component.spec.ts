import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelFiltroRefComponent } from './modal-sel-filtro-ref.component';

describe('ModalSelFiltroRefComponent', () => {
  let component: ModalSelFiltroRefComponent;
  let fixture: ComponentFixture<ModalSelFiltroRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelFiltroRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelFiltroRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
