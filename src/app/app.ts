import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherBriefingForm } from './components/weather-briefing-form/weather-briefing-form';
import { ResultsTable } from './components/results-table/results-table';
import { ErrorAlert } from './components/error-alert/error-alert';
import { WeatherBriefingService } from './services/weather-briefing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherBriefingForm, ResultsTable, ErrorAlert],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ibl-homework');
  private briefingService = inject(WeatherBriefingService);
  weatherBriefingResults = this.briefingService.responseData;
  weatherBriefingError = this.briefingService.errorMessage;
}
