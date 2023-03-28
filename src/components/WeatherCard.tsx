import React from "react";
import Image from "next/image";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
type WeatherCardProps = {
  weatherData: any;
};

export function WeatherCard({ weatherData }: WeatherCardProps) {
  const { forecast, isError, isLoading } = useWeatherForecast(6.5833, 3.75);

  return (
    <div className="bg-white mt-9 rounded-3xl  w-96 mx-auto shadow-lg p-4 flex space-x-10 items-center ">
      <div className="weather__details">
        <h1 className="font-bold text-[#000000] opacity-75 text-5xl">
          {weatherData?.main?.temp}
          <sup>o</sup>
        </h1>

        {/* <h2>Cloudy</h2> */}

        <h3 className="text-sm text-gray-400 mt-1">
          {weatherData?.name} , {weatherData?.sys?.country}
        </h3>

        <div className="flex space-x-3 mt-5 text-sm text-gray-600">
          <div className="flex">
            <h4>Wind {weatherData?.wind?.speed} km/h </h4>
          </div>
          <div className="flex">
            <h4> Humidity :{weatherData?.main?.humidity} % </h4>
          </div>
        </div>
      </div>

      <div className="weather__image ">
        {weatherData.weather && weatherData?.weather[0]?.icon && (
          // fetch the image from open weather api
          <Image
            src={`https://api.openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`}
            alt="weather"
            width={100}
            height={100}
          />
        )}
      </div>
    </div>
  );
}
