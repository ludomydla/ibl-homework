import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBriefingForm } from './weather-briefing-form';

describe('WeatherBriefingForm', () => {
  let component: WeatherBriefingForm;
  let fixture: ComponentFixture<WeatherBriefingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherBriefingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherBriefingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
