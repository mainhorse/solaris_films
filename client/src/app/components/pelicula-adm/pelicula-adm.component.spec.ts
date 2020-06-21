import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaAdmComponent } from './pelicula-adm.component';

describe('PeliculaAdmComponent', () => {
  let component: PeliculaAdmComponent;
  let fixture: ComponentFixture<PeliculaAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
