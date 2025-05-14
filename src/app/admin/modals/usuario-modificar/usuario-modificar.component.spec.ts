import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModificarComponent } from './usuario-modificar.component';

describe('UsuarioModificarComponent', () => {
  let component: UsuarioModificarComponent;
  let fixture: ComponentFixture<UsuarioModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioModificarComponent]
    });
    fixture = TestBed.createComponent(UsuarioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
