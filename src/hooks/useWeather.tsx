import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  description: string;
}

interface UseWeatherResult {
  weather: WeatherData | null;
  loadingWeather: boolean;
  error: string | null;
}

// Open-Meteo
const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle light",
  53: "Drizzle moderate",
  55: "Drizzle dense",
  56: "Freezing drizzle light",
  57: "Freezing drizzle dense",
  61: "Rain slight",
  63: "Rain moderate",
  65: "Rain heavy",
  66: "Freezing rain light",
  67: "Freezing rain heavy",
  71: "Snow fall slight",
  73: "Snow fall moderate",
  75: "Snow fall heavy",
  77: "Snow grains",
  80: "Rain showers slight",
  81: "Rain showers moderate",
  82: "Rain showers violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};


export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        const current = data.current_weather;
        setWeather({
          temperature: current.temperature,
          description: weatherCodeMap[current.weathercode] || "Unknown",
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingWeather(false);
      }
    };

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setError(err.message);
        setLoadingWeather(false);
      }
    );
  }, []);

  return { weather, loadingWeather, error };
}
