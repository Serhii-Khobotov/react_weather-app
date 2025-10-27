type WeatherData = {
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
};

const CACHE_TIME = 10 * 60 * 1000;

export async function getWeather(city: string, apiKey: string): Promise<WeatherData> {

  if (city.trim() === '') {
    throw new Error("Введіть назву міста");
  }

  const key = `weather_${city.toLowerCase()}`;
  const cached = localStorage.getItem(key);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data;
    }
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`
  );

  if (!res.ok) {
    throw new Error(`Місто ${city} не знайдено`);
  }

  const json = await res.json();

  const data: WeatherData = {
    temp: json.main.temp,
    description: json.weather[0].description,
    humidity: json.main.humidity,
    wind: json.wind.speed,
    icon: json.weather[0].icon,
  };

  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}
