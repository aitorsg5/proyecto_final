import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraccionComponent } from './traccion.component';

describe('TraccionComponent', () => {
  let component: TraccionComponent;
  let fixture: ComponentFixture<TraccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraccionComponent]
    });
    fixture = TestBed.createComponent(TraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
