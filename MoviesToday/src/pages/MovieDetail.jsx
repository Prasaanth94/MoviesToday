import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MovieDetail.module.css";

const MovieDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const omdb_apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const airtable_apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  // Retrieve movie ID(imdbID in database) from URL parameters
  const movieId = queryParams.get("movieId");

  const [movieDetails, setMovieDetails] = useState(null);
  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${omdb_apiKey}&i=${movieId}&plot=full`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovieDetails(data);
      console.log("here:", data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  console.log(movieDetails);

  const addToFavourites = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appWunuVeHtLUeYu4/Table%201",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${airtable_apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  movie_name: movieDetails.Title,
                  movie_img: movieDetails.Poster,
                  notes: "",
                  imdb_id: movieDetails.imdbID,
                },
              },
            ],
          }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      {movieDetails ? (
        <div className={`container ${styles.position}`}>
          <div className={styles.moviecontainer}>
            <div className={styles.movieposter}>
              <img src={movieDetails.Poster} alt="Movie Poster" />
            </div>
            <div className={styles.moviedetails}>
              <div className={styles.detailsheader}>
                <h2>{movieDetails.Title}</h2>
                <div className={styles.metascore}>
                  Metascore:
                  <span className={styles.metascoreno}>
                    {movieDetails.Metascore}
                  </span>
                </div>
                <div className={styles.imdbrating}>
                  IMDB Rating:{" "}
                  <span className={styles.imdbratingno}>
                    {movieDetails.imdbRating}
                  </span>
                </div>
                <div className={styles.runtime}>
                  Runtime: {movieDetails.Runtime}
                </div>
              </div>
              <p>Writer: {movieDetails.Writer}</p>
              <p>Director: {movieDetails.Director}</p>
              <p>Actors: {movieDetails.Actors}</p>
              <p>Year: {movieDetails.Year}</p>
              <p>Genre: {movieDetails.Genre}</p>
              <p>Rated: {movieDetails.Rated}</p>
              <p>Released: {movieDetails.Released}</p>

              <button onClick={addToFavourites}>Favourite</button>
            </div>
          </div>
          {/* Add more details as needed */}
          <div className={styles.movieplot}>{movieDetails.Plot}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MovieDetails;
