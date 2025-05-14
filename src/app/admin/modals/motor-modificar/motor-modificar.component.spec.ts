import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorModificarComponent } from './motor-modificar.component';

describe('MotorModificarComponent', () => {
  let component: MotorModificarComponent;
  let fixture: ComponentFixture<MotorModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotorModificarComponent]
    });
    fixture = TestBed.createComponent(MotorModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
