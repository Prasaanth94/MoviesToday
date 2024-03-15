import React from "react";
import { Link } from "react-router-dom";

const FavouritesDisplay = ({ favourites }) => {
  if (!favourites || !favourites.records) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {favourites.records.map((record, index) => (
        <div key={index} className="card" style={{ width: 18 + "rem" }}>
          <img
            src={record.fields.movie_img}
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title">{record.fields.movie_name}</h5>
            <Link
              to={`/movie-details?movieId=${encodeURIComponent(
                record.fields.imdb_id
              )}`}
            >
              <button>See Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouritesDisplay;
