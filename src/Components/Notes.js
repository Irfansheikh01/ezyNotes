import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/Login')
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const [note, setNote] = useState({
    eid: "",
    etitle: "d",
    edescription: "d",
    etag: "d",
  });

  const updateNote = (currenNote) => {
    ref.current.click();
    setNote({
      eid: currenNote._id,
      etitle: currenNote.title,
      edescription: currenNote.description,
      etag: currenNote.tag,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    props.showAlert("success", "Note is updated successfully!");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit a note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    placeholder="add a title"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    placeholder="add a description"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    placeholder="add a tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 4 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" container row my-3">
        <h2> Your Notes:</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
