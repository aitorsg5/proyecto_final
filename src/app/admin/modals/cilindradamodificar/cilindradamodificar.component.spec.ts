import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilindradamodificarComponent } from './cilindradamodificar.component';

describe('CilindradamodificarComponent', () => {
  let component: CilindradamodificarComponent;
  let fixture: ComponentFixture<CilindradamodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CilindradamodificarComponent]
    });
    fixture = TestBed.createComponent(CilindradamodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
