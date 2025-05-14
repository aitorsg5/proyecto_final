import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaballosmodificarComponent } from './caballosmodificar.component';

describe('CaballosmodificarComponent', () => {
  let component: CaballosmodificarComponent;
  let fixture: ComponentFixture<CaballosmodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaballosmodificarComponent]
    });
    fixture = TestBed.createComponent(CaballosmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
