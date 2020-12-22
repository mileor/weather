import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WeatherService } from '../../services/weather.service';
import { ListItem, SortButton, WeatherData, WeatherDataResponse } from '../../interfaces/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  searchTerm: string = '';
  weatherData: ListItem[];
  isShowError: boolean = false;
  sortButtons: SortButton[] = [
    {
      text: 'Сортировать по дате',
      icon: '↓',
      isSortByAsc: false,
      sortHandler: () => this.sortByDateHandler(),
    },
    {
      text: 'Сортировать по температуре',
      icon: '↓',
      isSortByAsc: false,
      sortHandler: () => this.sortByTemperatureHandler(),
    },
  ];

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params?.subscribe(params => this.searchByUrl(params.searchTerm));
  }

  handleSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      this.router.navigate(['/search', this.searchTerm]);
      this.getWeather(this.searchTerm);
    }
  }

  private searchByUrl(searchTerm: string): void {
    if (searchTerm && searchTerm.trim().length > 0) {
      this.searchTerm = searchTerm;
      this.getWeather(this.searchTerm);
    }
  }

  private sortByDateHandler(): void {
    this.sortButtons[0].isSortByAsc = !this.sortButtons[0].isSortByAsc;
    if (this.sortButtons[0].isSortByAsc) {
      this.weatherData.sort((a: ListItem, b: ListItem) => b.timestamp - a.timestamp);
      this.sortButtons[0].icon = '↑';
    } else {
      this.weatherData.sort((a: ListItem, b: ListItem) => a.timestamp - b.timestamp);
      this.sortButtons[0].icon = '↓';
    }
  }

  private sortByTemperatureHandler(): void {
    this.sortButtons[1].isSortByAsc = !this.sortButtons[1].isSortByAsc;
    if (this.sortButtons[1].isSortByAsc) {
      this.weatherData.sort((a: ListItem, b: ListItem) => Number(b.title) - Number(a.title));
      this.sortButtons[1].icon = '↑';
    } else {
      this.weatherData.sort((a: ListItem, b: ListItem) => Number(a.title) - Number(b.title));
      this.sortButtons[1].icon = '↓';
    }
  }

  private getWeather(searchTerm: string): void {
    this.weatherService.getWeather(searchTerm).subscribe(
      weatherDataResponse => this.handleWeatherData(weatherDataResponse),
      () => this.handleSearchError()
    );
  }

  private handleWeatherData(weatherDataResponse: WeatherDataResponse): void {
    const weatherByTime = weatherDataResponse.list.reduce((acc: ListItem[], item: WeatherData) => {
      const date = new Date((item.dt - weatherDataResponse.city.timezone) * 1000);
      const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon.slice(0, 2) + 'd'}@2x.png`;
      acc.push({
        index: `${new DatePipe('ru-Ru').transform(date, 'E')}`,
        date,
        timestamp: item.dt,
        iconUrl,
        iconDescription: 'Иконка погоды',
        title: `${Math.round(item.main.temp)}`,
        description: item.weather[0].description,
      });
      return acc;
    }, []);

    const todayElement = { ...weatherByTime[0], index: 'Сегодня' };
    const todayElementDate = new Date(todayElement.timestamp * 1000);

    const weatherByDay = weatherByTime.reduce((acc: ListItem[], item: ListItem) => {
      const date = new Date(item.timestamp * 1000);
      if (date.getHours() === 15 && date.getDate() !== todayElementDate.getDate()) {
        acc.push(item);
      }
      return acc;
    }, [todayElement]);

    this.isShowError = false;
    this.weatherData = weatherByDay;
  }

  private handleSearchError(): void {
    this.weatherData = [];
    this.isShowError = true;
  }
}
