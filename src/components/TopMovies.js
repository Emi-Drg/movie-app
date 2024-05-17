import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { MovieContext } from "../context/movieContext";

const TopMovies = () => {
  const { topMovies, favoriteIds, loadingData } = useContext(MovieContext);

  return (
    <div className="bg-gray-400 font-serif">
      {loadingData ? (
        <div className="flex items-center justify-center h-screen">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {topMovies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              isFavorite={favoriteIds.includes(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopMovies;
