import {
  BriefingResponse,
  ExtendedBriefingResponseResultItem,
} from '../../services/weather-briefing.api';

const CLOUD_HEIGHT_LIMIT = 30;

type IcaoName = string;
export function transformWeatherBriefingRespToTabular(responseData: BriefingResponse) {
  const result: { [key: IcaoName]: ExtendedBriefingResponseResultItem[] } = {};
  responseData.result.forEach((briefingRow) => {
    const tokens = tokenizeReportText(briefingRow.text);
    const tokenEnhancedBriefingRow = { ...briefingRow, tokens: tokens };
    if (result[briefingRow.stationId]) {
      result[briefingRow.stationId].push(tokenEnhancedBriefingRow);
    } else result[briefingRow.stationId] = [tokenEnhancedBriefingRow];
  });
  return Object.values(result);
}

function getTagFromSegment(segment: string) {
  if (segment === '\r\r\n') return 'br';
  else return 'span';
}

function getColorFromSegment(segment: string) {
  if (segment.startsWith('FEW') || segment.startsWith('BKN') || segment.startsWith('SCT')) {
    const numberFromSegment = Number(segment.substring(3, 6));
    if (numberFromSegment <= CLOUD_HEIGHT_LIMIT) return 'blue';
    else return 'red';
  } else return '';
}

function tokenizeReportText(text: string) {
  const segments = text.replaceAll('\r\r\n', ' \r\r\n ').trim().split(' ');
  return segments
    .filter((segment) => segment !== '')
    .map((segment) => ({
      tag: getTagFromSegment(segment),
      text: segment,
      color: getColorFromSegment(segment),
    }));
}
