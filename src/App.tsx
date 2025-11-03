import { store } from "./store/store";
import { Provider } from "react-redux";
import { WeatherPage } from "./pages/WeatherPage";

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px]">
          <h1 className="text-2xl font-bold text-center mb-4">Прогноз погоди</h1>
          <WeatherPage />
        </div>
      </div>
    </Provider>
  );
}
