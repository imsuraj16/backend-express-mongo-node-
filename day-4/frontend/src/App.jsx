import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const App = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [notes, setnotes] = useState([]);
  const [edit, setedit] = useState(false);
  const [editid, seteditid] = useState(null);

  const addnotes = async () => {
    try {
      await axios.post("http://localhost:3000", { title, desc, id: nanoid() });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000");
      setnotes(data);
    } catch (error) {
      console.log(error);
    }
  };
  const patchnote = async (id) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/${id}`, {
        title,
        desc,
      });
      getNotes();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
       await axios.delete(`http://localhost:3000/${id}`);
       getNotes()
    } catch (error) {
      console.log(error);
      
    }
   
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      patchnote(editid);
      setedit(false);
      seteditid(null);
    } else {
      addnotes();
    }

    settitle("");
    setdesc("");
  };

  const editHandler = (note) => {
    settitle(note.title);
    setdesc(note.desc);
    setedit(true);
    seteditid(note.id);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        📝 My Notes App
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mb-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => settitle(e.target.value)}
          value={title}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setdesc(e.target.value)}
          value={desc}
          required
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200">
          {edit ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {notes.length>0 ? (
          notes.map((note) => (
            <div
              key={note?.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-indigo-700">
                  {note?.title}
                </h2>
                <p className="text-gray-700 mt-2">{note?.desc}</p>
              </div>
              <div className="flex items-center gap-[2rem]">
                <button
                  onClick={() => editHandler(note)}
                  className="bg-yellow-200 px-3 py-1 rounded-md"
                >
                  edit
                </button>
                <button onClick={()=>deleteNote(note.id)} className="bg-red-200 px-3 py-1 rounded-md">
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
