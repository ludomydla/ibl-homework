import { BriefingRequest, ReportType } from "../../services/weather-briefing.api";
import { WeatherBriefingFormModel } from "./weather-briefing-form";

const RIA_REQUEST_ID = 'queryLudovitMydla';
const RIA_REQUEST_METHOD = 'query';

export function buildPayloadFromForm(formValue: WeatherBriefingFormModel) {
    const payload: BriefingRequest = {
        id: RIA_REQUEST_ID,
        method: RIA_REQUEST_METHOD,
        params: [
            {
                id: 'briefing01', 
                reportTypes: [
                ...(formValue.metar ? [ReportType.METAR] : []),
                ...(formValue.sigmet ? [ReportType.SIGMET] : []),
                ...(formValue.taf ? [ReportType.TAF] : [])
                ],        
                stations: formValue.airports ? formValue.airports.toUpperCase().split(' ') : undefined,
                countries: formValue.countries ? formValue.countries.toUpperCase().split(' ') : undefined,
            }
        ]
    };
    return payload;
}