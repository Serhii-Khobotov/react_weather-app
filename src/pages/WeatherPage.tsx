import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchWeather } from '../feature/weather/weatherSlice';
import formatValue from '../services/formatValue';
import { WeatherForm } from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';
import { Loader } from '../components/Loader';

export function WeatherPage() {
  const [city, setCity] = useState('');
  const [value, setValue] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);

  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (loading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;
  
    setIsSubmit(true);
    setValue(city);

    dispatch(fetchWeather(city));
    
    setCity('');
  };

  const handleValueChange =(e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (isSubmit) {
      setIsSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-600 p-4 text-white">
      <WeatherForm
        city={city}
        onChange={handleValueChange}
        onSubmit={handleSubmit}
        isLoading={loading}
      />

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {isSubmit && !showLoader && (
        <h2>Погода в {formatValue(value)}</h2>
      )}

      {showLoader && (
        <Loader />
      )}

      {data && !showLoader && (
        <WeatherCard />
      )}
    </div>
  );
}
