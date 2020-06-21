import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaAdmComponent } from './comida-adm.component';

describe('ComidaAdmComponent', () => {
  let component: ComidaAdmComponent;
  let fixture: ComponentFixture<ComidaAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidaAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidaAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
