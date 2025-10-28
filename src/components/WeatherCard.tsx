type Props = {
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
};

export default function WeatherCard({ temp, description, humidity, wind, icon }: Props) {
  const bg =
    description.includes("дощ") ? "from-blue-700 to-gray-500"
    : description.includes("сніг") ? "from-blue-400 to-white"
    : description.includes("хмар") ? "from-gray-500 to-gray-700"
    : "from-yellow-400 to-orange-500";

  return (
    <div className={`p-6 rounded-2xl shadow-xl bg-gradient-to-b ${bg} text-center`}>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <h2 className="text-4xl font-bold mb-8">{Math.round(temp)}°C</h2>
      <div className="flex flex-col gap-3">
        <p className="capitalize">{description}</p>
        <p>💧 Вологість: {humidity}%</p>
        <p>🌬️ Вітер: {wind} м/с</p>
      </div>
    </div>
  );
}

