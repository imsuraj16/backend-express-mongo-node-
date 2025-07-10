import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,

  reducers: {
    loadNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export default noteSlice.reducer;
export const { loadNote } = noteSlice.actions;
