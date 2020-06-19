import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavInicioComponent } from './nav-inicio.component';

describe('NavInicioComponent', () => {
  let component: NavInicioComponent;
  let fixture: ComponentFixture<NavInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
