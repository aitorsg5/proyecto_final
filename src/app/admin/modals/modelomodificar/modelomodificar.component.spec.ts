import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelomodificarComponent } from './modelomodificar.component';

describe('ModelomodificarComponent', () => {
  let component: ModelomodificarComponent;
  let fixture: ComponentFixture<ModelomodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelomodificarComponent]
    });
    fixture = TestBed.createComponent(ModelomodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
