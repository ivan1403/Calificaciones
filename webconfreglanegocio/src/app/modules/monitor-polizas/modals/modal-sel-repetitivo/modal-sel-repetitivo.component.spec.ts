import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelRepetitivoComponent } from './modal-sel-repetitivo.component';

describe('ModalSelRepetitivoComponent', () => {
  let component: ModalSelRepetitivoComponent;
  let fixture: ComponentFixture<ModalSelRepetitivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelRepetitivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelRepetitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
