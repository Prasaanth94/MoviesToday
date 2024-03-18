import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.css";

const Cards = ({ movieData }) => {
  if (!movieData || Object.keys(movieData).length === 0) {
    return <div>No movie data available</div>;
  }
  return (
    <div className={` ${styles.cardTop}`}>
      <div className={`card ${styles.cardSize}`} style={{ width: "18rem" }}>
        <img
          src={movieData.Poster}
          className="card-img-top"
          alt="..."
          width="286"
          height="430"
        />
        <div className={`card-body ${styles.cardBody}`}>
          <h5 className="card-title">{movieData.Title}</h5>
          <Link
            to={`/movie-details?movieId=${encodeURIComponent(
              movieData.imdbID
            )}`}
          >
            <button>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
