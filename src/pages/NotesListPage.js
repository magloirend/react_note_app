import React, { useEffect, useState } from "react";
// import notes_data from "../assets/Data.js";
import ListItems from "../components/ListItems.js";
import AddButton from "../components/addButton";

const NotesListPages = () => {
  let [notesList, setNotesList] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("http://127.0.0.1:8000/notes/");
    let data = await response.json();
    setNotesList(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notesList.length}</p>
      </div>
      <div className="notes-list-item">
        {notesList.map((notes, index) => (
          <ListItems key={index} noteLoop={notes} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPages;
