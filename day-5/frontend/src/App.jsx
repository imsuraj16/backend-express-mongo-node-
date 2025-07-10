import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNotes, editNotes, getAllnotes } from "./store/actions/noteActions";


const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.note.notes) || [];
  

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const [editid, setEditid] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !desc.trim()) return;

    if (edit) {
      dispatch(
        editNotes({ title: title.trim(), desc: desc.trim(), _id: editid })
      );
      setEdit(false);
      setEditid(null);
    } else {
      dispatch(addNote({ title: title.trim(), desc: desc.trim() }));
    }

    setTitle("");
    setDesc("");
  };

  const editHandler = (notee) => {
    setEdit(true);
    setTitle(notee.title);
    setDesc(notee.desc);
    setEditid(notee._id);
  };

  useEffect(() => {
    dispatch(getAllnotes());
    return ()=>{
      console.log('hii');
      
    }
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📝 My Notes App
        </h1>

        {/* Note Form */}
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Create a New Note
          </h2>

          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-indigo-400"
          />

          <button className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition-all">
            {edit ? "update note" : "Add note"}
          </button>
        </form>

        {/* Notes Display */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No notes yet!
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-400"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {note.title}
                    </h3>
                    <p className="text-gray-700">{note.desc}</p>
                  </div>

                  <div className="flex gap-10">
                    <button
                      onClick={() => editHandler(note)}
                      className="bg-amber-200 px-3 py-1 rounded-md"
                    >
                      edit
                    </button>
                    <button onClick={()=>dispatch(deleteNotes(note))} className="bg-red-400 px-3 py-1 rounded-md">
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
