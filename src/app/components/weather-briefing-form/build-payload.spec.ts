import { buildPayloadFromForm } from './build-payload';
import { WeatherBriefingFormModel } from './weather-briefing-form.model';
import { ReportType } from '../../services/weather-briefing.api';

const baseModel: WeatherBriefingFormModel = {
  metar: false,
  sigmet: false,
  taf: false,
  airports: '',
  countries: '',
};

describe('buildPayloadFromForm', () => {
  it('builds the request envelope', () => {
    const payload = buildPayloadFromForm({ ...baseModel, metar: true, airports: 'EGLL' });

    expect(payload.method).toBe('query');
    expect(payload.params).toHaveLength(1);
    expect(payload.params[0].id).toBe('briefing01');
  });

  it('maps selected message types to reportTypes in metar/sigmet/taf order', () => {
    const payload = buildPayloadFromForm({
      ...baseModel,
      metar: true,
      sigmet: true,
      taf: true,
      airports: 'EGLL',
    });

    expect(payload.params[0].reportTypes).toEqual([
      ReportType.METAR,
      ReportType.SIGMET,
      ReportType.TAF,
    ]);
  });

  it('serializes TAF as TAF_LONGTAF', () => {
    const payload = buildPayloadFromForm({ ...baseModel, taf: true, airports: 'EGLL' });

    expect(payload.params[0].reportTypes).toEqual(['TAF_LONGTAF']);
  });

  it('includes only the selected message type', () => {
    const payload = buildPayloadFromForm({ ...baseModel, sigmet: true, airports: 'EGLL' });

    expect(payload.params[0].reportTypes).toEqual([ReportType.SIGMET]);
  });

  it('splits multiple space-separated airport codes into stations', () => {
    const payload = buildPayloadFromForm({ ...baseModel, metar: true, airports: 'EGLL EGKK LZIB' });

    expect(payload.params[0].stations).toEqual(['EGLL', 'EGKK', 'LZIB']);
  });

  it('wraps a single airport code in a one-element stations array', () => {
    const payload = buildPayloadFromForm({ ...baseModel, metar: true, airports: 'EGLL' });

    expect(payload.params[0].stations).toEqual(['EGLL']);
  });

  it('splits multiple country codes and leaves stations undefined when airports is empty', () => {
    const payload = buildPayloadFromForm({ ...baseModel, metar: true, countries: 'LZ SK' });

    expect(payload.params[0].countries).toEqual(['LZ', 'SK']);
    expect(payload.params[0].stations).toBeUndefined();
  });

  it('leaves countries undefined when only airports are provided', () => {
    const payload = buildPayloadFromForm({ ...baseModel, metar: true, airports: 'EGLL' });

    expect(payload.params[0].countries).toBeUndefined();
  });

  it('builds a full payload conforming to the request model', () => {
    const payload = buildPayloadFromForm({
      metar: true,
      sigmet: false,
      taf: true,
      airports: 'EGLL EGKK',
      countries: 'LZ',
    });

    expect(payload).toEqual({
      id: 'queryLudovitMydla',
      method: 'query',
      params: [
        {
          id: 'briefing01',
          reportTypes: [ReportType.METAR, ReportType.TAF],
          stations: ['EGLL', 'EGKK'],
          countries: ['LZ'],
        },
      ],
    });
  });
});
