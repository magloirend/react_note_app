import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import notes_data from "../assets/Data";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotesPage = () => {
  const { id } = useParams();
  const history = useNavigate();

  let [noteArray, setNoteArray] = useState(null);
  // let noteArray = notes_data.find((note) => note.id === Number(id));

  useEffect(() => {
    let getNote = async () => {
      if (id === "new") return;
      if (id === "new") {
        setNoteArray({ body: " create note" }); // Initialize with an empty body for new notes
      } else {
        let response = await fetch(`http://127.0.0.1:8000/notes/${id}`);
        let data = await response.json();
        setNoteArray(data);
      }
    };
    getNote();
  }, [id]);

  const createNote = async () => {
    console.log("create note");
    await fetch(`http://127.0.0.1:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...noteArray, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:8000/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...noteArray, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://127.0.0.1:8000/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteArray),
    });
    history("/");
  };

  let handleSubmit = () => {
    if (id !== "new" && !noteArray.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && noteArray !== null) {
      createNote();
    }
    history("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={"/"}>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      {/* Render textarea if noteArray is not null or if id is 'new' */}
      {(noteArray !== null || id === "new") && (
        <textarea
          value={noteArray?.body || ""} // Use noteArray.body if it exists, or an empty string
          onChange={(e) => setNoteArray({ ...noteArray, body: e.target.value })}
        />
      )}
    </div>
  );
};

export default NotesPage;
