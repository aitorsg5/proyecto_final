import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraccionmodificarComponent } from './traccionmodificar.component';

describe('TraccionmodificarComponent', () => {
  let component: TraccionmodificarComponent;
  let fixture: ComponentFixture<TraccionmodificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraccionmodificarComponent]
    });
    fixture = TestBed.createComponent(TraccionmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
