import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotesModal from "../components/NotesModal";
import styles from "./FavouritesDisplay.module.css";

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
    return (
      <div className={styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (favourites.length === 0) {
    return (
      <div className={styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <>
      <div>
        {favourites.map((record, index) => (
          <div
            key={index}
            className={`card ${styles.favouriteCard}`}
            style={{ width: 18 + "rem" }}
          >
            <img
              src={record.fields.movie_img}
              className="card-img-top"
              alt="..."
            ></img>
            <div className={`card-body ${styles.cardBody}`}>
              <h5 className="card-title">{record.fields.movie_name}</h5>
              <Link
                to={`/movie-details?movieId=${encodeURIComponent(
                  record.fields.imdb_id
                )}`}
              >
                <button className={styles.details}>Details</button>
              </Link>
              <button
                className={styles.unfavouriteButton}
                onClick={() => {
                  unfavourite(record.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-star-fill ${styles.star}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                unfavourite
              </button>
              {/* on click passes the record in to the openNoteModal function to help set correspodin data */}
              <button
                className={styles.notes}
                onClick={() => openNotesModal(record)}
              >
                Notes
              </button>
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
