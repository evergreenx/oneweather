import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { MdFavoriteBorder } from "react-icons/md";
import { ForecastCard } from "./ForcastCard";
import Link from "next/link";
import Tooltip from "./Tooltip";

type WeatherCardProps = {
  weatherData: any;
  showForecast: boolean;
  temperatureUnit: string;
};

export function WeatherCard({
  weatherData,
  showForecast,
  temperatureUnit,
}: WeatherCardProps) {
  const { forecasts, isError, isLoading } = useWeatherForecast(
    weatherData?.coord?.lon,
    weatherData?.coord?.lat,
    temperatureUnit
  );

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const handleFavorite = () => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      // Get favorites from localStorage
      const favoritesData = localStorage.getItem("favoriteWeatherData");

      let favorites = [];
      if (favoritesData) {
        favorites = JSON.parse(favoritesData);
      }

      // Check if the location is already a favorite
      const isFavorited = favorites.some(
        (favorite: any) => favorite.id === weatherData.id
      );

      if (!isFavorited) {
        // Add the location to favorites
        favorites.push(weatherData);

        // Update the favorites in localStorage
        localStorage.setItem("favoriteWeatherData", JSON.stringify(favorites));

        // Update the state
        setIsFavorited(favorites);
      }
    }
  };
  return (
    <>
      <div className="bg-transparent mt-9 rounded-3xl w-full  lg:w-96 mx-auto shadow-2xl p-4 flex flex-col     ">
        <div className="weather__details">
          <div className="favourite__icon">
            <Tooltip text="add location to favorite ">
              <MdFavoriteBorder
                className={`text-2xl cursor-pointer ${
                  isFavorited ? "text-red-600" : "hover:text-red-600"
                }`}
                onClick={handleFavorite}
              />
            </Tooltip>
          </div>

          <div className="flex justify-between w-full ">
            <div className="weather__info flex flex-col ">
              <h1 className="font-bold text-[#000000] opacity-75 lg:text-5xl text-2xl">
                {weatherData?.main?.temp}
                <sup>°</sup>

                {
                  // show the temperature unit
                  temperatureUnit === "Metric" ? "C" : "F"
                }
              </h1>

              <h3 className="text-sm text-gray-400 mt-1">
                {weatherData?.name} , {weatherData?.sys?.country}
              </h3>
            </div>

            <div className="weather__image ">
              <h2 className="text-sm text-gray-400 italic">
                {weatherData.weather && weatherData?.weather[0]?.description}{" "}
              </h2>
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

          <div className="flex flex-row justify-between p-2  mt-5 text-sm text-gray-600">
            <div className="flex flex-col">
              <h4>forcast </h4>
              <h4>{weatherData?.weather[0].main}</h4>
            </div>
            <div className="flex flex-col">
              <h4>Wind </h4>
              <h4>{weatherData?.wind?.speed} km/h</h4>
            </div>

            <div className="flex flex-col">
              <h4> Humidity </h4>
              <h4>{weatherData?.main?.humidity} %</h4>
            </div>

            <div className="flex flex-col">
              <h4> Pressure</h4>
              <h4>{weatherData?.main?.pressure} hPa</h4>
            </div>
          </div>
        </div>
      </div>

      {showForecast && (
        <ForecastCard
          forecasts={forecasts?.list}
          temperatureUnit={temperatureUnit}
          isLoading={isLoading}
        />
      )}

      {
        // see favlocation

        <h1 className="text-center text-sm italic my-10">
          <Link href="/favlocation">see favorite location</Link>
        </h1>
      }
    </>
  );
}
