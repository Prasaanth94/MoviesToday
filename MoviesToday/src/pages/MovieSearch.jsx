import React from "react";
import { useEffect, useState, useRef } from "react";
import Cards from "../components/Cards";
import styles from "./MoviesSearch.module.css";

const MovieSearch = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("");

  const omdb_apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const getData = async (searchValue) => {
    setIsLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${omdb_apiKey}&s=${searchValue}`,
        { signal: controller.signal }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log("Data received:", data);
      if (data.Search) {
        setSearchMovies(data.Search);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValue.trim() !== "") {
      getData(searchValue);
    } else {
      setSearchMovies([]); // Clear search results if the search value is empty
    }
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, [searchValue]);
  return (
    <>
      <div className={`container ${styles.searchDiv}`}>
        <div className={styles.inputArea}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Movie..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          ></input>
          <div className={styles.label}>Search Movie</div>
        </div>
      </div>
      <div className={styles.horizontal}>
        {searchMovies.map((movie, index) => {
          return <Cards movieData={movie} key={index}></Cards>;
        })}
      </div>
    </>
  );
};

export default MovieSearch;
