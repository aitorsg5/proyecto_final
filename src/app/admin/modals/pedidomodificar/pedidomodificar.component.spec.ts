import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidomodificarComponent } from './pedidomodificar.component';

describe('PedidomodificarComponent', () => {
  let component: PedidomodificarComponent;
  let fixture: ComponentFixture<PedidomodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidomodificarComponent]
    });
    fixture = TestBed.createComponent(PedidomodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
