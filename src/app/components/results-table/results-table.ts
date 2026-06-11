import { Component, computed, input } from '@angular/core';
import { BriefingResponse } from '../../services/weather-briefing.api';
import { DatePipe } from '@angular/common';
import { transformWeatherBriefingRespToTabular } from './transform';

@Component({
  selector: 'results-table',
  imports: [DatePipe],
  templateUrl: './results-table.html',
  styleUrl: './results-table.css',
})
export class ResultsTable {
  responseData = input.required<BriefingResponse>();
  tabularData = computed( () => transformWeatherBriefingRespToTabular(this.responseData()));
}
