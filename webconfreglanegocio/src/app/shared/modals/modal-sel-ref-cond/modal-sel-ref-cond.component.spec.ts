import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelRefCondComponent } from './modal-sel-ref-cond.component';

describe('ModalSelRefCondComponent', () => {
  let component: ModalSelRefCondComponent;
  let fixture: ComponentFixture<ModalSelRefCondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelRefCondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelRefCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
