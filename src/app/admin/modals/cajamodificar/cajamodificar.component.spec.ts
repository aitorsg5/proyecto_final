import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajamodificarComponent } from './cajamodificar.component';

describe('CajamodificarComponent', () => {
  let component: CajamodificarComponent;
  let fixture: ComponentFixture<CajamodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CajamodificarComponent]
    });
    fixture = TestBed.createComponent(CajamodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
