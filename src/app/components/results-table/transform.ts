import {
  BriefingResponse,
  ExtendedBriefingResponseResultItem,
} from '../../services/weather-briefing.api';

const CLOUD_HEIGHT_LIMIT = 30;
const BLUE_CLASS = 'text-blue-500';
const RED_CLASS = 'text-red-500';

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
  console.log('result', result);
  return Object.values(result);
}

function getTagFromSegment(segment: string) {
  if (segment === '\r\r\n') return 'br';
  else return 'span';
}

function getColorFromSegment(segment: string) {
  if (segment.startsWith('FEW') || segment.startsWith('BKN') || segment.startsWith('SCT')) {
    const numberFromSegment = Number(segment.substring(3, 6));
    if (numberFromSegment <= CLOUD_HEIGHT_LIMIT) return BLUE_CLASS;
    else return RED_CLASS;
  } else return '';
}

function tokenizeReportText(text: string) {
  const segments = text.replaceAll('\r\r\n', ' \r\r\n ').trim().split(' ');
  return segments.map((segment) => ({
    tag: getTagFromSegment(segment),
    text: segment,
    class: getColorFromSegment(segment),
  }));
}
