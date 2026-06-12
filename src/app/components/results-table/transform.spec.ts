import {
  getColorFromSegment,
  getTagFromSegment,
  tokenizeReportText,
  transformWeatherBriefingRespToTabular,
} from './transform';
import { BriefingResponse, BriefingResponseResultItem } from '../../services/weather-briefing.api';

// transform only reads `stationId` and `text`, so a minimal shape is enough.
function row(stationId: string, text: string): BriefingResponseResultItem {
  return { stationId, text } as unknown as BriefingResponseResultItem;
}

function response(...items: BriefingResponseResultItem[]): BriefingResponse {
  return { error: null, id: 'test', result: items };
}

describe('getTagFromSegment', () => {
  it('maps a CRLF segment to a br tag', () => {
    expect(getTagFromSegment('\r\r\n')).toBe('br');
  });

  it('maps a normal segment to a span tag', () => {
    expect(getTagFromSegment('METAR')).toBe('span');
  });
});

describe('getColorFromSegment', () => {
  it('colors low cloud groups blue (height <= 30)', () => {
    expect(getColorFromSegment('FEW030')).toBe('blue');
    expect(getColorFromSegment('SCT025')).toBe('blue');
  });

  it('treats the 30 boundary as blue', () => {
    expect(getColorFromSegment('BKN030')).toBe('blue');
  });

  it('colors high cloud groups red (height > 30)', () => {
    expect(getColorFromSegment('FEW031')).toBe('red');
    expect(getColorFromSegment('BKN100')).toBe('red');
    expect(getColorFromSegment('SCT040')).toBe('red');
  });

  it('returns no color for non-cloud segments', () => {
    expect(getColorFromSegment('METAR')).toBe('');
    expect(getColorFromSegment('EGLL')).toBe('');
    expect(getColorFromSegment('24010KT')).toBe('');
  });

  it('returns no colors for unknown height', () => {
    expect(getColorFromSegment('FEW///')).toBe('');
  });
});

describe('tokenizeReportText', () => {
  it('splits a simple report into span tokens with no color', () => {
    const tokens = tokenizeReportText('METAR EGLL');

    expect(tokens).toEqual([
      { tag: 'span', text: 'METAR', color: '' },
      { tag: 'span', text: 'EGLL', color: '' },
    ]);
  });

  it('emits a br token for CRLF and no empty tokens', () => {
    const tokens = tokenizeReportText('METAR\r\r\nEGLL');

    expect(tokens.map((t) => t.tag)).toEqual(['span', 'br', 'span']);
    expect(tokens.map((t) => t.text)).toEqual(['METAR', '\r\r\n', 'EGLL']);
    expect(tokens.some((t) => t.text === '')).toBe(false);
  });

  it('collapses multiple spaces without producing empty tokens', () => {
    const tokens = tokenizeReportText('A  B');

    expect(tokens.map((t) => t.text)).toEqual(['A', 'B']);
  });

  it('trims leading and trailing whitespace', () => {
    const tokens = tokenizeReportText('  METAR EGLL  ');

    expect(tokens.map((t) => t.text)).toEqual(['METAR', 'EGLL']);
  });

  it('colors cloud groups inside a report', () => {
    const tokens = tokenizeReportText('METAR EGLL FEW030 BKN100');

    const byText = Object.fromEntries(tokens.map((t) => [t.text, t.color]));
    expect(byText['FEW030']).toBe('blue');
    expect(byText['BKN100']).toBe('red');
    expect(byText['METAR']).toBe('');
    expect(byText['EGLL']).toBe('');
  });
});

describe('transformWeatherBriefingRespToTabular', () => {
  it('returns an empty array for an empty result', () => {
    expect(transformWeatherBriefingRespToTabular(response())).toEqual([]);
  });

  it('groups multiple reports of the same station, preserving order', () => {
    const grouped = transformWeatherBriefingRespToTabular(
      response(row('EGLL', 'METAR EGLL'), row('EGLL', 'TAF EGLL')),
    );

    expect(grouped).toHaveLength(1);
    expect(grouped[0]).toHaveLength(2);
    expect(grouped[0].map((r) => r.text)).toEqual(['METAR EGLL', 'TAF EGLL']);
  });

  it('keeps separate stations in separate groups, in insertion order', () => {
    const grouped = transformWeatherBriefingRespToTabular(
      response(row('EGLL', 'METAR EGLL'), row('LZIB', 'METAR LZIB')),
    );

    expect(grouped).toHaveLength(2);
    expect(grouped[0][0].stationId).toBe('EGLL');
    expect(grouped[1][0].stationId).toBe('LZIB');
  });

  it('attaches tokens derived from the report text', () => {
    const grouped = transformWeatherBriefingRespToTabular(response(row('EGLL', 'METAR EGLL')));

    expect(grouped[0][0].tokens).toEqual([
      { tag: 'span', text: 'METAR', color: '' },
      { tag: 'span', text: 'EGLL', color: '' },
    ]);
  });
});
