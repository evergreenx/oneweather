import React, { useState } from "react";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

type FavoriteAccordionProps = {
  favorite: {
    id: number;
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    sys: {
      country: string;
    };

    weather: {
      description: string;
    }[];

    wind: {
      speed: number;
    };
  };
};

export const FavoriteAccordion: React.FC<FavoriteAccordionProps> = ({
  favorite,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="accordion__header w-full flex  justify-btween">
        <p>
          {favorite.name} {favorite.sys.country}
        </p>

        <button onClick={() => setIsOpen(!isOpen)} className="p-1">
          {!isOpen ? <VscTriangleDown /> : <VscTriangleUp />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* Display additional details for the favorite location */}
          <p>{favorite.weather[0].description}</p>

          <p>temperature : {favorite.main.temp}</p>
          <p>wind : {favorite.wind.speed} km/h</p>
          <p>Humidity : {favorite.main.humidity} % </p>
        </div>
      )}
    </div>
  );
};
