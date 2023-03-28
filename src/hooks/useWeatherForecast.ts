import useSWR from "swr";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export const useWeatherForecast = (lon:number , lat:number, ) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_URL}`;
  const { data, error } = useSWR(apiUrl, fetcher);

  return {
    forecasts: data,
    isLoading: !data && !error,
    isError: error,
  };
};
