import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BriefingRequest, BriefingResponse } from './weather-briefing.api';

const API_URL = 'https://ogcie.iblsoft.com/ria/opmetquery';

@Injectable({
  providedIn: 'root',
})
export class WeatherBriefingService {
    private http = inject(HttpClient);

    responseData = signal<BriefingResponse | null>(null);

    async getBriefing(payload: BriefingRequest): Promise<void> {
        try {
          const response = await firstValueFrom(
            this.http.post<BriefingResponse>(API_URL, payload),
          );
          this.responseData.set(response);
        } catch {
          // network/HTTP error: leave previous results in place.
          // (User-facing error handling is out of scope for this change.)
        }
    }
}
