import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPolizasComponent } from './monitor-polizas.component';

describe('MonitorPolizasComponent', () => {
  let component: MonitorPolizasComponent;
  let fixture: ComponentFixture<MonitorPolizasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorPolizasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
