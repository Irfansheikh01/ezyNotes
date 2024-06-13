import React from "react";

const NoteItem = (props) => {
  const { note, updateNote, deleteIconClicked } = props;

  return (
    <div className="col-md-3 mx-10">
      <div className="card my-3">
      <div style={{display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right:1}}>
      <span className="badge bg-light text-dark"> {note.tag} </span>
      </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteIconClicked(note._id);
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
