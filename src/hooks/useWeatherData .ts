import useSWR, { mutate, SWRResponse } from "swr";
import { useEffect, useState } from "react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

interface FetcherError extends Error {
  info?: any;
  status?: number;
}
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 404) {
    const error: FetcherError = new Error(
      "The city you entered was not a real place"
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json() as Promise<WeatherData>;
};

type UseWeatherDataResponse = SWRResponse<
  WeatherData,
  Error,
  () => Promise<WeatherData>
>;

export const useWeatherData = (city: string): UseWeatherDataResponse => {
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(city);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [city]);
  const { data, error, isValidating, isLoading } = useSWR(
    debouncedTerm
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=metric`
      : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
};

