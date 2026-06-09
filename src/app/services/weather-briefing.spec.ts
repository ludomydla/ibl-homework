import { TestBed } from '@angular/core/testing';

import { WeatherBriefing } from './weather-briefing';

describe('WeatherBriefing', () => {
  let service: WeatherBriefing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherBriefing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
