import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotesModal from "../components/NotesModal";

const FavouritesDisplay = ({ favourites, unfavourite }) => {
  const airtable_apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  const [showNotesModal, setShowNotesModal] = useState(false);
  //state to track the id of the movie selected
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const openNotesModal = (record) => {
    //setting the id of the movie from the noted buttton of he movie clicked
    setSelectedMovieId(record.id);

    setShowNotesModal(true);
  };

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
              {/* on click passes the record in to the openNoteModal function to help set correspodin data */}
              <button onClick={() => openNotesModal(record)}>Notes</button>
            </div>
            {showNotesModal && selectedMovieId === record.id && (
              <NotesModal
                title={record.fields.movie_name}
                recordId={record.id}
                notes={record.fields.notes}
                movie_img={record.fields.movie_img}
                imdb_id={record.fields.imdb_id}
                airtable_apiKey={airtable_apiKey}
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
