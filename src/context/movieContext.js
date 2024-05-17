import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const apiKey = process.env.REACT_APP_API_KEY;

export const MovieProvider = ({ children }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loadingData, setLoadingData] = useState(false);

  const getTopMovies = async () => {
    setLoadingData(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      const topMovies = data.results;

      const moviesDetails = await Promise.all(
        topMovies.map(async (movie) => {
          const movieId = movie.id;

          // we call endpoint {movieId} so that we get info abput movies
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
          );

          if (!movieResponse) {
            throw new Error("Failed to fetch the movie details ...");
          }
          const movieData = await movieResponse.json();

          //we get all the details we need

          const poster = movieData.poster_path;
          const releaseYear = movieData.release_date
            ? movieData.release_date.substring(0, 4)
            : "-";
          const duration = movieData.runtime ? movieData.runtime + "min" : "-";

          // for getting directors we need another api call at another endpoint

          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
          );
          if (!creditsResponse.ok) {
            throw new Error("Failed to fetch movie credits...");
          }
          const creditsData = await creditsResponse.json();
          const directors = creditsData.crew
            .filter((person) => person.job === "Director")
            .map((director) => director.name);

          return { ...movie, poster, releaseYear, directors, duration };
        })
      );

      setTopMovies(moviesDetails);
    } catch (error) {
      console.error("Error fetching movies", error);
      return null;
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getTopMovies();
  }, []);

  useEffect(() => {
    const favorites = topMovies.filter((movie) =>
      favoriteIds.includes(movie.id)
    );
    setFavoriteMovies(favorites);
  }, [topMovies, favoriteIds]);

  return (
    <MovieContext.Provider
      value={{
        topMovies,
        setTopMovies,
        favoriteMovies,
        setFavoriteMovies,
        favoriteIds,
        setFavoriteIds,
        loadingData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
