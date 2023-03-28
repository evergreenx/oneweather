import useSWR from "swr";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export const useWeatherForecast = (lat:number, lon:number) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_URL}&cnt=5`;
  const { data, error } = useSWR(apiUrl, fetcher);

  return {
    forecast: data,
    isLoading: !data && !error,
    isError: error,
  };
};
