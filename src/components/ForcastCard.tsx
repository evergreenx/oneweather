import React from "react";
import Image from "next/image";
import { forecastDays } from "../utils/forcastdays";
import ContentLoader from "react-content-loader";

interface Forecast {
  temperature: number;
  humidity: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    main : string;
  }[];
}

interface ForecastCardProps {
  forecasts: Forecast[];
  temperatureUnit: string;
  isLoading: Boolean;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecasts,
  temperatureUnit,
  isLoading,
}) => {
  return (
    <>
      <div className="skeleton__loader flex">
        {isLoading && (
          <ContentLoader
            speed={1}
            width={390}
            height={348}
            viewBox="0 0 390 378"
            backgroundColor="#fff"
            foregroundColor="#ecebeb"
            className="mx-auto"
          >
            <rect x="552" y="484" rx="0" ry="0" width="127" height="84" />
            <rect x="6" y="61" rx="23" ry="23" width="386" height="140" />
          </ContentLoader>
        )}
      </div>

      <div className="bg-transparent  lg:w-96 mx-auto my-10 rounded-2xl p-5 flex items-center  justify-around shadow-2xl ">
        {forecasts?.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast__card">
            <div className="forcast__results ">
              <div className="flex flex-col items-center">

              <h1 className="text-sm font-medium italic text-gray-400">
                 {
                  forecast?.weather[0].main
                 }
                </h1>
                <h1 className="text-sm font-semibold ">
                  {Math.round(forecast?.main?.temp)}
                  <sup>°</sup>
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
    </>
  );
};
