import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { MdFavoriteBorder } from "react-icons/md";
import { ForecastCard } from "./ForcastCard";
import Link from "next/link";

type WeatherCardProps = {
  weatherData: any;
  showForecast: boolean;
};

export function WeatherCard({ weatherData, showForecast }: WeatherCardProps) {
  const { forecasts, isError, isLoading } = useWeatherForecast(
    weatherData?.coord?.lon,
    weatherData?.coord?.lat
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
      <div className="bg-white mt-9 rounded-3xl  w-96 mx-auto shadow-lg p-4 flex space-x-10 items-center ">
        <div className="weather__details">
          <div className="favourite__icon">
            <MdFavoriteBorder
              className={`text-2xl cursor-pointer ${
                isFavorited ? "text-red-600" : "hover:text-red-600"
              }`}
              onClick={handleFavorite}
            />
          </div>

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

      {showForecast && <ForecastCard forecasts={forecasts?.list} />}

      {
        // see favlocation

        <h1 className="text-center text-sm italic my-10">
          <Link href="/favlocation">see favorite location</Link>
        </h1>
      }
    </>
  );
}
