import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://mern-api-backend-rho.vercel.app"
  // const host = "http://localhost:5000"
  const [notes, setNotes] = useState([])
  const [user,setUser] = useState([])

  //Get user Details
  const getUserDetails = async ()=>{
    //api call to get user details
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
  });
   const json = await response.json();
   //console.log(json);
   setUser(json);
  }


  //Get all Notes
  const getNotes = async ()=>{
    //api call to get all notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
  });
   const json = await response.json();
  //  console.log(json);
   setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) =>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
  });
    const json = await response.json();
    console.log(json)
    //logic to add
    setNotes(notes.concat(json))
    }

  //Delete a note
  const deleteNote = async (id) =>{
    //delete api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    //logic for delete
    console.log("Deleting a note with id : "+id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async(id, title, description, tag) =>{
    //EDIT API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
      
  });
  const json = await response.json();
  console.log(json)
    //logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        notes[index].title = title
        notes[index].description = description
        notes[index].tag = tag
      }
    }
    setNotes(notes)
    getNotes()
  }
  
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote, getNotes, getUserDetails, user}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
