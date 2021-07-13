import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoOrigenComponent } from './modal-info-origen.component';

describe('ModalInfoOrigenComponent', () => {
  let component: ModalInfoOrigenComponent;
  let fixture: ComponentFixture<ModalInfoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoOrigenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
