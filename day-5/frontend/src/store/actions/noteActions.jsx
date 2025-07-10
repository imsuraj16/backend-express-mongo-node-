import axios from "../../api/apiConfig";
import { loadNote } from "../reducers/noteSlice";

export const addNote = (note) => async (dispatch) => {
  try {
    const { data } = await axios.post("/notes", note);
    dispatch(getAllnotes());
  } catch (error) {
    console.log(error);
  }
};

export const getAllnotes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/notes");
    dispatch(loadNote(data));
  } catch (error) {
    console.log(error);
  }
};

export const editNotes = (note) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/notes/${note._id}`, {
      title: note.title,
      desc: note.desc,
    });
    dispatch(getAllnotes());
  } catch (error) {
    console.log(error);
  }
};


export const deleteNotes = (note)=>async(dispatch)=>{

    try {
        await axios.delete(`/notes/${note._id}`)
        dispatch(getAllnotes())
    } catch (error) {
        console.log(error);
        
    }
}