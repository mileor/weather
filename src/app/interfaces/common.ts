export interface WeatherDataResponse {
  city: {
    coord: {
      lat: number,
      lon: number,
    }
    country: string,
    id: number,
    name: string,
    population: number,
    sunrise: number,
    sunset: number,
    timezone: number,
  };
  cnt: number;
  cod: string;
  list: WeatherData[];
  message: number;
}
export interface WeatherData {
  clouds: {
    all: number,
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number,
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_kf: number,
    temp_max: number,
    temp_min: number,
  };
  pop: number;
  sys: {
    pod: string,
  };
  visibility: number;
  weather: [{
    description: string,
    icon: string,
    id: number,
    main: string,
  }];
  wind: {
    deg: number,
    speed: number,
  };
}
export interface ListItem {
  index: string;
  date: Date;
  timestamp: number;
  iconUrl: string;
  iconDescription: string;
  title: string;
  description: string;
}

export interface SortButton {
  text: string;
  isSortByAsc: boolean;
  icon: string;
  sortHandler: () => void;
}
