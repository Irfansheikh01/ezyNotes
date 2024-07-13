import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote, user, getUserDetails, loading } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      getUserDetails();
    }
    else{
      navigate('/Login')
    }
    // eslint-disable-next-line
  }, []);

  const refUpdate = useRef(null);
  const refDelete = useRef('null');
  const [deleteNoteID, setDeleteNoteID] = useState(null);
  const [note, setNote] = useState({
    eid: "",
    etitle: "d",
    edescription: "d",
    etag: "d",
  });

  const updateNote = (currenNote) => {
    refUpdate.current.click();
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

  const deleteIconClicked = (id) =>{
    // document.getElementById('refDeleteModal').click();
    refDelete.current.click();
    setDeleteNoteID(id);
  } 
  const handleDelete = (e) =>{
    e.preventDefault();
    deleteNote(deleteNoteID);
    props.showAlert("success", "Note is deleted successfully!");
  }

  return (
    <>
      <div className="container"><i>Welcome {user.name}!</i></div>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={refUpdate}
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
                  <textarea
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


      <button
        ref={refDelete}
        type="button"
        // id = "refDeleteModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Launch demo modal for DELETE
      </button>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete a note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            Are you sure you want to delete this item?
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
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" container row my-3">
        <h2> Your Notes:</h2>
        <div className="container">
        {loading && <Spinner />}
          {!loading  && notes.length === 0 && "No notes to display"}
        </div>
        {!loading  && notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              deleteIconClicked = {deleteIconClicked}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
