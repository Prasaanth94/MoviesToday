import React from "react";
import styles from "./NotesModal.module.css";
import ReactDOM from "react-dom";

const Notes = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h1>Notes</h1>
        <p>{props.title}</p>
        <button
          className="col-md-3"
          onClick={() => {
            props.setShowNotesModal(false);
          }}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

const NotesModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Notes
          recordId={props.recordId}
          title={props.title}
          setShowNotesModal={props.setShowNotesModal}
        ></Notes>,

        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default NotesModal;
