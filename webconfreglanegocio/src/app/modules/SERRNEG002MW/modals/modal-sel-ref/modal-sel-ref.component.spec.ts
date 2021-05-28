import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelRefComponent } from './modal-sel-ref.component';

describe('ModalSelRefComponent', () => {
  let component: ModalSelRefComponent;
  let fixture: ComponentFixture<ModalSelRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
