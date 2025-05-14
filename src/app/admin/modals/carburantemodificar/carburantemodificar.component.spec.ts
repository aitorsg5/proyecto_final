import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburantemodificarComponent } from './carburantemodificar.component';

describe('CarburantemodificarComponent', () => {
  let component: CarburantemodificarComponent;
  let fixture: ComponentFixture<CarburantemodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarburantemodificarComponent]
    });
    fixture = TestBed.createComponent(CarburantemodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
