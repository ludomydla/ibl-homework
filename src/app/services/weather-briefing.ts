import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BriefingRequest } from './weather-briefing.api';

const API_URL = 'https://ogcie.iblsoft.com/ria/opmetquery';

@Injectable({
  providedIn: 'root',
})
export class WeatherBriefingService {
    private http = inject(HttpClient);
    
    getBriefing(payload: BriefingRequest) {
        this.http.post(API_URL, payload).subscribe((response) => {
          console.log('response', response);
        });
    }
}
