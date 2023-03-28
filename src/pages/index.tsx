import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useWeatherData } from "@/hooks/useWeatherData ";

import { SearchBox, WeatherCard } from "@/components";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userInput, setUserInput] = useState("");

  const { data, error, isLoading, mutate, isValidating } =
    useWeatherData(userInput);

  return (
    <>
      <Head>
        <title>oneweather || {userInput}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="max-w-5xl bg-blue-50  p-5 mx-auto ">
        <div className="search__container">
          <SearchBox userInput={userInput} setUserInput={setUserInput} />

          {!isLoading && data && <WeatherCard weatherData={data} />}

          <div className="error__container mx-auto flex ">
            {isLoading && (
              <p className="text-blue-300 font-extrabold text-2xl mx-auto my-10">
                Loading...
              </p>
            )}
          </div>

          <div className="error__container mx-auto flex ">
            {error && (
              <p className="text-red-300 font-extrabold text-2xl mx-auto my-10">
                {error.message}
              </p>
            )}
          </div>
        </div>
      </body>
    </>
  );
}
