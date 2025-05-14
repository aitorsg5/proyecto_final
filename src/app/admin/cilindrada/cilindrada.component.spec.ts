import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CilindradaComponent } from './cilindrada.component';

describe('CilindradaComponent', () => {
  let component: CilindradaComponent;
  let fixture: ComponentFixture<CilindradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CilindradaComponent]
    });
    fixture = TestBed.createComponent(CilindradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
