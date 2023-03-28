import React from "react";
import { forecastDays } from "../utils/forcastdays";

interface Forecast {
  date: string;
  temperature: number;
  humidity: number;
  main: {
    temp: number;
  }
}

interface ForecastCardProps {
  forecasts: Forecast[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecasts }) => {
  console.log(forecasts);
  return (
    <div className="bg-white  w-96 mx-auto my-10 rounded-2xl p-5 flex justify-around">
      {forecasts.slice(0, 5).map((forecast, index) => (
        <div key={index} className="forecast__card">
          <div className="forcast__results flex space-x-6">
            <div>
              <h1 className="text-sm font-semibold ">
                {Math.round(forecast?.main?.temp)}°C
              </h1>
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
