import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburanteComponent } from './carburante.component';

describe('CarburanteComponent', () => {
  let component: CarburanteComponent;
  let fixture: ComponentFixture<CarburanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarburanteComponent]
    });
    fixture = TestBed.createComponent(CarburanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
