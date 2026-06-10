import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { WeatherBriefingService } from '../../services/weather-briefing';
import { ReportType } from '../../services/weather-briefing.api';

@Component({
  selector: 'weather-briefing-form',
  imports: [FormField, FormRoot],
  templateUrl: './weather-briefing-form.html',
})
export class WeatherBriefingForm {
  weatherBriefing = inject(WeatherBriefingService);

  weatherBriefingModel = signal({
    metar: false,
    sigmet: false,
    taf: false,
    airports: '',
    countries: '',
  });
  
  weatherBriefingForm = form(this.weatherBriefingModel, (schemaPath) => {
    required(schemaPath.airports);
    required(schemaPath.countries);
  }, {
    submission: {
      action: async (formObj) => {
        const formValue = formObj().value();
        const payload = {
          id: 'query01',
          method: 'query',
          params: [
            {
              id: 'briefing01', 
              reportTypes: [
                ...(formValue.metar ? [ReportType.METAR] : []),
                ...(formValue.sigmet ? [ReportType.SIGMET] : []),
                ...(formValue.taf ? [ReportType.TAF] : [])
              ],        
              stations: formValue.airports.split(' '),
              countries: formValue.countries.split(' ')
            }
          ]
        };
        
        this.weatherBriefing.getBriefing(payload);
      }
    }
  });

}
