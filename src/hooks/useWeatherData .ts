import useSWR, { SWRResponse } from "swr";
import { useState, Dispatch, SetStateAction } from "react";

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
type WeatherDataResponse = SWRResponse<
  WeatherData,
  Error,
  () => Promise<WeatherData>
>;

type UseWeatherDataResponse = WeatherDataResponse & {
  setIsMounted: Dispatch<SetStateAction<boolean>>;
};

export const useWeatherData = (city: string , temperatureUnit : string): UseWeatherDataResponse => {
  const [isMounted, setIsMounted] = useState(false);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    isMounted
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=${temperatureUnit}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    setIsMounted,
    isValidating,
    mutate,
  };
};
