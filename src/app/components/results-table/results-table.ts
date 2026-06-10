import { Component, input } from '@angular/core';
import { BriefingResponse } from '../../services/weather-briefing.api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'results-table',
  imports: [JsonPipe],
  templateUrl: './results-table.html',
})
export class ResultsTable {
  responseData = input.required<BriefingResponse>();
}
