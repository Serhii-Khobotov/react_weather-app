import type { WeatherData } from "./WeatherData";

export type WeatherState = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
};