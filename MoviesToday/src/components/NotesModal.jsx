import React, { useRef, useState, useEffect } from "react";
import styles from "./NotesModal.module.css";
import ReactDOM from "react-dom";

const Notes = (props) => {
  const updateNotesRef = useRef(null);
  const [notes, setNotes] = useState(props.notes);

  const updateNotes = async () => {
    console.log(props.imdb_id);
    console.log(props.title);
    console.log(props.movie_img);
    console.log(props.airtable_apiKey);
    const res = await fetch(
      `https://api.airtable.com/v0/appWunuVeHtLUeYu4/Table%201/${props.recordId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${props.airtable_apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            movie_name: props.title,
            movie_img: props.movie_img,
            notes: updateNotesRef.current.value,
            imdb_id: props.imdb_id,
          },
        }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorData.message}`
      );
    }
    props.onNotesUpdate(updateNotesRef.current.value);
  };
  useEffect(() => {
    // Update local state when notes prop changes
    setNotes(props.notes);
  }, [props.notes]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h1>{props.title}</h1>
        <input
          className={styles.notesDisplay}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          ref={updateNotesRef}
          type="text"
        ></input>
        <button
          className="col-md-3"
          onClick={() => {
            props.setShowNotesModal(false);
          }}
        >
          cancel
        </button>
        <button className="col-md-3" onClick={updateNotes}>
          Update
        </button>
      </div>
    </div>
  );
};

const NotesModal = (props) => {
  const [updatedNotes, setUpdatedNotes] = useState(props.notes || "");

  const handleNotesUpdate = (newNotes) => {
    setUpdatedNotes(newNotes);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Notes
          recordId={props.recordId}
          title={props.title}
          notes={updatedNotes}
          setShowNotesModal={props.setShowNotesModal}
          airtable_apiKey={props.airtable_apiKey}
          movie_img={props.movie_img}
          imdb_id={props.imdb_id}
          onNotesUpdate={handleNotesUpdate}
        ></Notes>,

        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default NotesModal;
