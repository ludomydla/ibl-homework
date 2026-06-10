import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BriefingRequest, BriefingResponse } from './weather-briefing.api';

const API_URL = 'https://ogcie.iblsoft.com/ria/opmetquery';

@Injectable({
  providedIn: 'root',
})
export class WeatherBriefingService {
    private http = inject(HttpClient);

    responseData = signal<BriefingResponse | null>(null);

    getBriefing(payload: BriefingRequest) {
        this.http.post(API_URL, payload).subscribe((response) => {
          this.responseData.set(response as BriefingResponse);
        });
    }
}
