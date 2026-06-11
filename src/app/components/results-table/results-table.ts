import { Component, computed, input } from '@angular/core';
import { BriefingResponse } from '../../services/weather-briefing.api';
import { DatePipe } from '@angular/common';
import { transformWeatherBriefingRespToTabular } from './transform';

const BLUE_CLASS = 'text-blue-500';
const RED_CLASS = 'text-red-500';

const COLOR_TO_CLASS: { [key: string]: string } = {
  red: RED_CLASS,
  blue: BLUE_CLASS,
};

@Component({
  selector: 'results-table',
  imports: [DatePipe],
  templateUrl: './results-table.html',
  styleUrl: './results-table.css',
})
export class ResultsTable {
  responseData = input.required<BriefingResponse>();
  tabularData = computed(() => transformWeatherBriefingRespToTabular(this.responseData()));

  mapColorToClass = function (color: string) {
    return COLOR_TO_CLASS[color];
  };
}
