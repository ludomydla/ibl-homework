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

export type BriefingResponseResultItemBase = {
    queryType: ReportType,
    receptionTime: Date,
    refs: string[],
    reportTime: Date,
    reportType: string;
    stationId: string;
    text: string;
}

export type BriefingResponseResultItemSIGMET = BriefingResponseResultItemBase & {
    validFrom: Date,
    validTo: Date,
}

export type BriefingResponseResultItemTAF = BriefingResponseResultItemSIGMET & {
    placeId: string;
    revision?: string;
    textHTML: string;
}

export type BriefingResponseResultItemMETAR = BriefingResponseResultItemBase & {
    placeId: string;
    revision: string;
    textHTML: string;
}

export type BriefingResponseResultItem = BriefingResponseResultItemSIGMET | BriefingResponseResultItemTAF | BriefingResponseResultItemMETAR;

type Token = {
    tag: string;
    text: string;
    class: string;
}
export type ExtendedBriefingResponseResultItem = BriefingResponseResultItem & {
    tokens: Token[];
}

export type BriefingResponseError = {
    code: number,
    data?: unknown
    message: string,
}

export type BriefingResponse = {
  error: BriefingResponseError | null,
  id: string,
  result: Array<BriefingResponseResultItem>,
}