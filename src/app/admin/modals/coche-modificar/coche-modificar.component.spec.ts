import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheModificarComponent } from './coche-modificar.component';

describe('CocheModificarComponent', () => {
  let component: CocheModificarComponent;
  let fixture: ComponentFixture<CocheModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocheModificarComponent]
    });
    fixture = TestBed.createComponent(CocheModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
