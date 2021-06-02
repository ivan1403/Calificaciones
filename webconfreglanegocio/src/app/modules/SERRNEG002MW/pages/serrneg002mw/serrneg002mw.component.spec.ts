import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Serrneg002mwComponent } from './serrneg002mw.component';

describe('Serrneg002mwComponent', () => {
  let component: Serrneg002mwComponent;
  let fixture: ComponentFixture<Serrneg002mwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Serrneg002mwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Serrneg002mwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
