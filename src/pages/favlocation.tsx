import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";

type FavoriteProps = {
  id: number;
  weatherData: any;
};

function FavLocatiion() {
  const [favorites, setFavorites] = useState<Array<FavoriteProps>>([]);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof localStorage !== "undefined") {
      // Get favorites from localStorage
      const favoritesData = localStorage.getItem("favoriteWeatherData");

      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    }
  }, []);
  const handleDeleteFavorite = (id: number) => {
    // Check if localStorage is available
    if (typeof localStorage !== "undefined") {
      // Get favorites from localStorage
      const favoritesData = localStorage.getItem("favoriteWeatherData");

      let favorites: { id: number; weatherData: any }[] = [];
      if (favoritesData) {
        favorites = JSON.parse(favoritesData);
      }

      // Find the index of the favorite to delete
      const index = favorites.findIndex((favorite) => favorite.id === id);

      if (index !== -1) {
        // Remove the favorite from the array
        favorites.splice(index, 1);

        // Update the favorites in localStorage
        localStorage.setItem("favoriteWeatherData", JSON.stringify(favorites));

        // Update the state
        setFavorites(favorites);
      }
    }
  };
  return (
    <div className="bg-blue-50 h-screen">
      <div className="max-w-5xl   p-5 mx-auto ">
        <h1 className="text-2xl font-bold text-gray-700">Favorite Locations</h1>

        {
          // show a message if there are no favorites
          favorites.length === 0 && (
            <div className=" mt-9 rounded text-xl  w-96 mx-auto  p-4 flex space-x-10 items-center ">
              <h1 className="text-gray-500">No favorite locations yet !</h1>
            </div>
          )
        }

        {favorites &&
          favorites?.map((favorite: any) => (
            <div
              key={favorite.id}
              className="bg-white mt-9 rounded  w-96 mx-auto shadow-lg p-4 flex space-x-10 justify-between items-center "
            >
              {favorite?.name} , {favorite?.sys?.country}
              <AiFillDelete
                className="cursor-pointer text-2xl"
                onClick={() => handleDeleteFavorite(favorite.id)}
              >
                Delete
              </AiFillDelete>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavLocatiion;
