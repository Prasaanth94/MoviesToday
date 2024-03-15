import React, { useState } from "react";
import { Link } from "react-router-dom";

const FavouritesDisplay = ({ favourites, unfavourite }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  if (favourites === null) {
    return <div>Loading...</div>;
  }
  if (favourites.length === 0) {
    return <div>No movies in favorites</div>;
  }
  return (
    <>
      <div>
        {favourites.map((record, index) => (
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
              <button
                onClick={() => {
                  unfavourite(record.id);
                }}
              >
                unfavourite
              </button>
              <button onClick={() => setShowNotesModal(true)}>Notes</button>
            </div>
            {showNotesModal && (
              <NotesModal
                title={record.fields.movie_name}
                recordId={record.id}
                setShowNotesModal={setShowNotesModal}
              ></NotesModal>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FavouritesDisplay;
