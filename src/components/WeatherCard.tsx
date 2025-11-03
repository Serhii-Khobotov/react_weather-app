import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

type Props = {
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
};

export default function WeatherCard() {
  const { data } = useAppSelector((state) => state.weather);

  if (!data) return null;

  const bg =
    data.description.includes("дощ") ? "from-blue-700 to-gray-500"
    : data.description.includes("сніг") ? "from-blue-400 to-white"
    : data.description.includes("хмар") ? "from-gray-500 to-gray-700"
    : "from-yellow-400 to-orange-500";

  return (
    <div className={`p-6 rounded-2xl shadow-xl bg-gradient-to-b ${bg} text-center`}>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="mx-auto"
      />
      <h2 className="text-4xl font-bold mb-8">{Math.round(data.temp)}°C</h2>
      <div className="flex flex-col gap-3">
        <p className="capitalize">{data.description}</p>
        <p>💧 Вологість: {data.humidity}%</p>
        <p>🌬️ Вітер: {data.wind} м/с</p>
      </div>
    </div>
  );
}

