import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBriefingForm } from './weather-briefing-form';
import { WeatherBriefingService } from '../../services/weather-briefing';
import { buildPayloadFromForm } from './build-payload';

describe('WeatherBriefingForm', () => {
  let component: WeatherBriefingForm;
  let fixture: ComponentFixture<WeatherBriefingForm>;
  let briefingServiceMock: { getBriefing: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    briefingServiceMock = { getBriefing: vi.fn().mockResolvedValue(undefined) };

    await TestBed.configureTestingModule({
      imports: [WeatherBriefingForm],
      providers: [{ provide: WeatherBriefingService, useValue: briefingServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherBriefingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function submitForm() {
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
  }

  it('renders the form controls', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(el.querySelectorAll('input[type="checkbox"]')).toHaveLength(3);
    expect(el.querySelectorAll('input[type="text"]')).toHaveLength(2);
    expect(el.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('does not submit an invalid form and reveals validation errors', async () => {
    submitForm();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(briefingServiceMock.getBriefing).not.toHaveBeenCalled();
    expect(component.submitAttempted()).toBe(true);
    expect(component.validationMessages().length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelector('error-alert')).toBeTruthy();
  });

  it('submits the built payload when the form is valid', async () => {
    component.weatherBriefingModel.set({
      metar: true,
      sigmet: false,
      taf: false,
      airports: 'EGLL',
      countries: '',
    });
    await fixture.whenStable();

    submitForm();
    await fixture.whenStable();

    expect(briefingServiceMock.getBriefing).toHaveBeenCalledTimes(1);
    expect(briefingServiceMock.getBriefing).toHaveBeenCalledWith(
      buildPayloadFromForm(component.weatherBriefingModel()),
    );
  });
});
