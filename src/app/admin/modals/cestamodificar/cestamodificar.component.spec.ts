import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestamodificarComponent } from './cestamodificar.component';

describe('CestamodificarComponent', () => {
  let component: CestamodificarComponent;
  let fixture: ComponentFixture<CestamodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CestamodificarComponent]
    });
    fixture = TestBed.createComponent(CestamodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
