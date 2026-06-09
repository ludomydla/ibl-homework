export enum ReportType {
    METAR = 'METAR',
    SIGMET = 'SIGMET',
    TAF = 'TAF_LONGTAF'
}

export type BriefingParams = {
    id: string,
    reportTypes: ReportType[],
    stations: string[],
    countries: string[]
}

export type BriefingRequest = {
    id: string,
    method: string,
    params: BriefingParams[];
}