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

export type BriefingResponseResultItem = {
    placeId: string,
    queryType: ReportType,
    receptionTime: Date,
    reportTime: Date,
    reportType: string,
    revision?: string,
    stationId: string,
    text: string,
    textHTML?: string
}

export type BriefingResponseError = {
    code: number,
    data?: unknown
    message: string,
}

export type BriefingResponse = {
  error: BriefingResponseError | null,
  id: string,
  result: BriefingResponseResultItem[],
}