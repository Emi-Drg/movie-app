import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import placeholderImage from "../images/placeholder.jpg";

const Card = ({ movie, isFavorite, showDelete }) => {
  const { poster, duration, directors, releaseYear, title, overview, id } =
    movie;

  const { setFavoriteIds } = useContext(MovieContext);

  const fallBackImageUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : placeholderImage;

  const handleToggleFavorites = (id) => {
    const savedItems = JSON.parse(localStorage.getItem("favorites")) || [];
    if (savedItems.includes(id)) {
      const newArr = savedItems.filter((item) => item !== id);
      localStorage.setItem("favorites", JSON.stringify(newArr));
      setFavoriteIds(newArr);
    } else {
      const otherArr = [...savedItems, id];
      localStorage.setItem("favorites", JSON.stringify(otherArr));
      setFavoriteIds(otherArr);
    }
  };
  return (
    <div className="w-[400px] h-[300px] bg-neutral-100 mt-3  flex shadow-lg transition-transform hover:scale-105  rounded-xl">
      <div className="h-full w-1/2">
        <img
          className="w-full object-cover h-full rounded-xl"
          src={fallBackImageUrl}
          alt="Movie Poster"
        />
      </div>
      <div className="w-1/2 flex flex-col p-2 justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold ">{title}</p>
            {showDelete ? (
              <div onClick={() => handleToggleFavorites(id)}>
                <i className="fa-solid fa-trash cursor-pointer"></i>
              </div>
            ) : (
              <div onClick={() => handleToggleFavorites(id)}>
                {isFavorite ? (
                  <i className="fa-solid fa-star text-red-800 cursor-pointer"></i>
                ) : (
                  <i className="fa-regular fa-star hover:text-red-800 cursor-pointer"></i>
                )}
              </div>
            )}
          </div>
          <div className="line-clamp-3">{overview}</div>
        </div>
        <div>
          <div>
            <span>Directors: </span>
            {directors.join(", ")}
          </div>
          <div className="flex justify-between">
            <div>{releaseYear}</div>
            <div>{duration}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
