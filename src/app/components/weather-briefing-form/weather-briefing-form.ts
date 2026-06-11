import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required, SchemaPathTree, validateTree } from '@angular/forms/signals';
import { WeatherBriefingService } from '../../services/weather-briefing';
import { ReportType } from '../../services/weather-briefing.api';
import { atLeastOneReportTypeSelected, eitherAirportsOrCountriesRequired } from './validations';
import { InputCheckbox } from '../input-checkbox/input-checkbox';
import { InputText } from '../input-text/input-text';
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
  imports: [FormField, FormRoot, InputCheckbox, InputText],
  templateUrl: './weather-briefing-form.html',
})
export class WeatherBriefingForm {
  weatherBriefing = inject(WeatherBriefingService);

  weatherBriefingModel = signal<WeatherBriefingFormModel>({
    metar: false,
    sigmet: false,
    taf: false,
    airports: '',
    countries: '',
  });
  
  weatherBriefingForm = form(this.weatherBriefingModel, (schemaPath) => {
    atLeastOneReportTypeSelected(schemaPath, 'At least 1 message type must be selected');
    eitherAirportsOrCountriesRequired(schemaPath, 'At least 1 of the following must be entered: airports, countries');
  }, {
    submission: {
      action: async (formObj) => {
        const payload = buildPayloadFromForm(formObj().value())

        await this.weatherBriefing.getBriefing(payload);
      }
    }
  });

}
