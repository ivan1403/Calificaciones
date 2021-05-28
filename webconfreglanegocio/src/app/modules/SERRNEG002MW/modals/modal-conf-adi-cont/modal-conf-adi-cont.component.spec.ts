import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfAdiContComponent } from './modal-conf-adi-cont.component';

describe('ModalConfAdiContComponent', () => {
  let component: ModalConfAdiContComponent;
  let fixture: ComponentFixture<ModalConfAdiContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfAdiContComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfAdiContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
