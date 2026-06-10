import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherBriefingForm } from './components/weather-briefing-form/weather-briefing-form';
import { ResultsTable } from './components/results-table/results-table';
import { WeatherBriefingService } from './services/weather-briefing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherBriefingForm, ResultsTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ibl-homework');
  private briefingService = inject(WeatherBriefingService);
  weatherBriefingResults = this.briefingService.responseData;
}
