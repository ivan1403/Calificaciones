import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerLogComponent } from './modal-ver-log.component';

describe('ModalVerLogComponent', () => {
  let component: ModalVerLogComponent;
  let fixture: ComponentFixture<ModalVerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
