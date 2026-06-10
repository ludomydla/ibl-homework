import { SchemaPathTree, validateTree } from "@angular/forms/signals";
import { WeatherBriefingFormModel } from "./weather-briefing-form";

export function atLeastOneReportTypeSelected(schemaPath: SchemaPathTree<WeatherBriefingFormModel>, errorMessage?: string) {
  validateTree(schemaPath, (ctx) => {
    const formValues = ctx.value();
    if(!formValues.metar && !formValues.sigmet && !formValues.taf) {
      return {
        kind: 'atLeastOneReportTypeSelected',
        message: errorMessage || 'At least one report type must be selected'
      }
    }
    return null;
  })
}

export function eitherAirportsOrCountriesRequired(schemaPath: SchemaPathTree<WeatherBriefingFormModel>, errorMessage?: string) {
  validateTree(schemaPath, (ctx) => {
    const formValues = ctx.value();
    if(!formValues.airports && !formValues.countries) {
      return {
        kind: 'eitherAirportsOrCountriesRequired',
        message: errorMessage || 'Either airports or countries must be entered'
      }
    }
    return null;
  })
}