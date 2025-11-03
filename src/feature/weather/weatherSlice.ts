import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import type { WeatherData } from '../../types/WeatherData';
import type { WeatherState } from '../../types/WeatherState';

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

fetch(`${API_URL}?q=${encodeURIComponent('kyiv')}&appid=${API_KEY}&units=metric&lang=ua`)
  .then(res => res.text())
  .then(data => console.log(data));

const CACHE_TIME = 10 * 60 * 1000;

let currentController: AbortController | null = null;

export const fetchWeather = createAsyncThunk<
  WeatherData,
  string,
  { state: RootState; rejectValue: string }
>('weather/fetchWeather', async (city, { rejectWithValue }) => {
  const key = `weather_${city.toLowerCase()}`;
  const cached = localStorage.getItem(key);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TIME) {
      return data as WeatherData;
    }
  }

  try {
    if (currentController) {
      currentController.abort();
    }

    currentController = new AbortController();

    const res = await fetch(
      `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ua`,
      { signal: currentController.signal }
    );

    setTimeout(() => {
      
    }, 5000);


    if (!res.ok) {
      return rejectWithValue('Місто не знайдено');
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
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return rejectWithValue('Запит скасовано');
    }
    return rejectWithValue('Помилка при завантаженні даних');
  } finally {
    currentController = null;
  }
});

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        if (action.payload === 'Запит скасовано') {
          return;
        };

        state.loading = false;
        state.error = action.payload ?? 'Помилка';
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
