import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelInfoOrigenComponent } from './modal-sel-info-origen.component';

describe('ModalSelInfoOrigenComponent', () => {
  let component: ModalSelInfoOrigenComponent;
  let fixture: ComponentFixture<ModalSelInfoOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelInfoOrigenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelInfoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
