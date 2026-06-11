import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, pattern, required, SchemaPathTree, validateTree } from '@angular/forms/signals';
import { WeatherBriefingService } from '../../services/weather-briefing';
import { ReportType } from '../../services/weather-briefing.api';
import { atLeastOneReportTypeSelected, eitherAirportsOrCountriesRequired } from './validations';
import { InputCheckbox } from '../input-checkbox/input-checkbox';
import { InputText } from '../input-text/input-text';
import { ErrorAlert } from '../error-alert/error-alert';
import { buildPayloadFromForm } from './buildPayloadFromForm';

export type WeatherBriefingFormModel = {
  metar: boolean;
  sigmet: boolean;
  taf: boolean;
  airports: string;
  countries: string;
}

@Component({
  selector: 'weather-briefing-form',
  imports: [FormField, FormRoot, InputCheckbox, InputText, ErrorAlert],
  templateUrl: './weather-briefing-form.html',
})
export class WeatherBriefingForm {
  weatherBriefing = inject(WeatherBriefingService);
  submitAttempted = signal(false);

  weatherBriefingModel = signal<WeatherBriefingFormModel>({
    metar: false,
    sigmet: false,
    taf: false,
    airports: '',
    countries: '',
  });
  
  weatherBriefingForm = form(this.weatherBriefingModel, (schemaPath) => {
    pattern(schemaPath.airports, /^([A-Z]{4} )*[A-Z]{4}$/, {message: 'ICAO airport codes must be 4 uppercase letters separated by spaces'});
    pattern(schemaPath.countries, /^([A-Z]{2} )*[A-Z]{2}$/, {message: 'WMO country codes must be 2 uppercase letters separated by spaces'});
    atLeastOneReportTypeSelected(schemaPath, 'At least 1 Message type must be selected');
    eitherAirportsOrCountriesRequired(schemaPath, 'Enter at least one airport ICAO code or one country WMO code');
  }, {
    submission: {
      action: async (formObj) => {
        const payload = buildPayloadFromForm(formObj().value())

        await this.weatherBriefing.getBriefing(payload);
      }
    }
  });

  validationMessages = computed(() =>
    this.weatherBriefingForm().errorSummary()
      .map((error) => error.message)
      .filter((message): message is string => !!message),
  );

}
