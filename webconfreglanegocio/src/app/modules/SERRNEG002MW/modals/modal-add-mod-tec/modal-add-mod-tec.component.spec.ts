import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddModTecComponent } from './modal-add-mod-tec.component';

describe('ModalAddModTecComponent', () => {
  let component: ModalAddModTecComponent;
  let fixture: ComponentFixture<ModalAddModTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddModTecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddModTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
