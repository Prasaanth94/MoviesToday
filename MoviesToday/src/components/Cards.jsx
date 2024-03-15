import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ movieData }) => {
  if (!movieData || Object.keys(movieData).length === 0) {
    return <div>No movie data available</div>;
  }
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={movieData.Poster} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{movieData.Title}</h5>
          <Link
            to={`/movie-details?movieId=${encodeURIComponent(
              movieData.imdbID
            )}`}
          >
            <button>Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
