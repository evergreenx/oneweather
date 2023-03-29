import React from "react";
import Image from "next/image";
import { forecastDays } from "../utils/forcastdays";

interface Forecast {
  temperature: number;
  humidity: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
  }[];
}

interface ForecastCardProps {
  forecasts: Forecast[];
  temperatureUnit: string;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecasts,
  temperatureUnit,
}) => {
  return (
    <div className="bg-white  lg:w-96 mx-auto my-10 rounded-2xl p-5 flex justify-around">
      {forecasts?.slice(0, 5).map((forecast, index) => (
        <div key={index} className="forecast__card">
          <div className="forcast__results ">
            <div>
              <h1 className="text-sm font-semibold ">
                {Math.round(forecast?.main?.temp)}°
                {
                  // show the temperature unit
                  temperatureUnit === "Metric" ? "C" : "F"
                }
              </h1>

              <div className="weather__image ">
                {forecast?.weather && forecast?.weather[0]?.icon && (
                  // fetch the image from open weather api
                  <Image
                    src={`https://api.openweathermap.org/img/w/${forecast?.weather[0]?.icon}.png`}
                    alt="weather"
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <h1 className="text-sm font-bold text-gray-500">
                {forecastDays(index)[index]}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
