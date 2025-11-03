type Props = {
  city: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function WeatherForm({ city, onChange, onSubmit, isLoading }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex gap-5 mb-6">
      <input
        value={city}
        onChange={onChange}
        placeholder="Введіть місто"
        className="px-3 py-2 rounded text-black bg-amber-200 hover:bg-amber-100"
      />
      <button
        type="submit"
        className="text-blue-700 font-semibold px-4 py-2 rounded bg-amber-400 cursor-pointer hover:bg-amber-500"
        disabled={isLoading}
      >
        {isLoading ? 'Завантаження...' : 'Пошук'}
      </button>
    </form>
  )
}