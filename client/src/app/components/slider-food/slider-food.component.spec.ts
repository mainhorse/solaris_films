import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFoodComponent } from './slider-food.component';

describe('SliderFoodComponent', () => {
  let component: SliderFoodComponent;
  let fixture: ComponentFixture<SliderFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
