import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { WeatherDataResponse } from 'src/app/interfaces/common';

@Injectable({ providedIn: 'root' })
export class WeatherService {

  private weatherUrl: string = 'http://api.openweathermap.org/data/2.5';

  constructor(
    private http: HttpClient,
  ) { }

  getWeather(query: string): Observable<WeatherDataResponse> {
    const url = `${this.weatherUrl}/forecast?q=${query}&lang=ru&units=metric`;
    return this.http.get<WeatherDataResponse>(url);
  }
}
