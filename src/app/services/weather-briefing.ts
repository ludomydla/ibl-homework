import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BriefingRequest, BriefingResponse } from './weather-briefing.api';

const API_URL = 'https://ogcie.iblsoft.com/ria/opmetquery';

@Injectable({
  providedIn: 'root',
})
export class WeatherBriefingService {
  private http = inject(HttpClient);

  private readonly _responseData = signal<BriefingResponse | null>(null);
  private readonly _errorMessage = signal<string | null>(null);

  readonly responseData = this._responseData.asReadonly();
  readonly errorMessage = this._errorMessage.asReadonly();

  async getBriefing(payload: BriefingRequest): Promise<void> {
    this._errorMessage.set(null);
    try {
      const response = await firstValueFrom(this.http.post<BriefingResponse>(API_URL, payload));
      if (response.error) {
        this.failWith(response.error.message || 'The weather briefing request failed.');
        return;
      }
      this._responseData.set(response);
    } catch (err) {
      this.failWith(this.describeHttpError(err));
    }
  }

  private failWith(message: string): void {
    this._errorMessage.set(message);
    this._responseData.set(null); // clear stale results — only the error shows
  }

  private describeHttpError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      // status 0 = no response reached (network/CORS) — no meaningful status to show
      if (err.status === 0) {
        return 'Could not reach the weather briefing service. Please try again.';
      }
      return `Request failed (HTTP ${err.status}). Please try again.`;
    }
    return 'The weather briefing request failed. Please try again.';
  }
}
