import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import Card from "./Card";

const Favorites = () => {
  const { favoriteMovies } = useContext(MovieContext);
  return (
    <div className="font-serif bg-gray-400 h-screen">
      {favoriteMovies.length > 0 ? (
        <div className="flex flex-wrap justify-evenly">
          {favoriteMovies.map((movie) => (
            <Card key={movie.id} showDelete movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-lg pt-3">
          No favorites for the moment ...
        </p>
      )}
    </div>
  );
};

export default Favorites;
