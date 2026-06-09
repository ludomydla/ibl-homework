import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherBriefingForm } from './components/weather-briefing-form/weather-briefing-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherBriefingForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ibl-homework');
}
