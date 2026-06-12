import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';

import { ResultsTable } from './results-table';
import { BriefingResponse, BriefingResponseResultItem } from '../../services/weather-briefing.api';

// The table's date column formats with sk-SK; main.ts registers it at runtime, tests don't.
registerLocaleData(localeSk, 'sk-SK');

function response(...items: BriefingResponseResultItem[]): BriefingResponse {
  return { error: null, id: 't', result: items };
}

describe('ResultsTable', () => {
  let fixture: ComponentFixture<ResultsTable>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTable);
  });

  it('shows a placeholder when there are no results', async () => {
    fixture.componentRef.setInput('responseData', response());
    await fixture.whenStable();

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('No results available');
  });

  it('renders a station header and report row for a result', async () => {
    const row = {
      stationId: 'EGLL',
      queryType: 'METAR',
      reportTime: new Date('2026-06-11T12:00:00Z'),
      text: 'METAR EGLL',
    } as unknown as BriefingResponseResultItem;
    fixture.componentRef.setInput('responseData', response(row));
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('th')?.textContent).toContain('EGLL');
    expect(el.textContent).toContain('METAR');
  });
});
