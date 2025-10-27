import { useRef, useState, type FormEvent } from "react";
import { getWeather } from "./services/getWeather";
import WeatherCard from "./components/WeatherCard/WeatherCard";

const API_KEY = "abad2c859f1dbb2be83a8040c3deaf48";

export default function App() {
  const [value, setValue] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const valueTrimmed = value.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError("")
    setLocationMessage("");
    setWeather(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (valueTrimmed === "" && error !== "") {
      inputRef.current?.focus();
      return;
    } else if (valueTrimmed.trim() === "") {
      setError("Введіть назву міста");
    }

    try {
      setError("");
      const data = await getWeather(valueTrimmed, API_KEY);
      setWeather(data);
      setValue("");
      setLocationMessage(`Погода в ${valueTrimmed[0].toUpperCase() + valueTrimmed.slice(1)}`);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    }
  };

  // const res = async () => {
  //   const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=abad2c859f1dbb2be83a8040c3deaf48&units=metric&lang=ua');

  //   try {
  //     const json = await data.json();
  //     console.log(json);
  //   }
  //   catch (e) {
  //     console.log('error')
  //   }
  // }

  // res();


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-600 p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Прогноз погоди</h1>
      <div className="flex gap-2 mb-6">
        <form
          className="flex gap-5"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            type="text"
            value={valueTrimmed}
            onChange={handleChange}
            placeholder="Введіть місто..."
            className="px-3 py-2 rounded text-black bg-amber-200 hover:bg-amber-100"
          />
          <button
            className="text-blue-700 font-semibold px-4 py-2 rounded bg-amber-400 cursor-pointer hover:bg-amber-500"
            type="submit"
          >
            Пошук
          </button>
        </form>
      </div>

      {!error &&
        <h2 className="font-bold text-3xl mb-5">{locationMessage}</h2>
      }

      {error && <p className="text-red-300">{error}</p>}
      {weather && <WeatherCard {...weather} />}
    </div>
  );
}
