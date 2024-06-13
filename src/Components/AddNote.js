import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"", description : "", tag:""})

  const handleSubmit = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description : "", tag:""});
    props.showAlert("success","Note is added successfully");
  }
  const onChange = (e) =>{
    setNote({...note,[e.target.name]: e.target.value})
  }
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            id="title"
            name = "title"
            aria-describedby="emailHelp"
            placeholder="add a title"
            value={note.title}
            onChange={onChange}
          />
          
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control my-2"
            id="description"
            name = "description"
            placeholder="add a description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            id="tag"
            name = "tag"
            placeholder="add a tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button disabled={note.title.length <4 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
