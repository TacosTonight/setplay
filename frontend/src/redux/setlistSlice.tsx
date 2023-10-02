import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../types";

const initialState: Setlist = {
  songs: [],
};

const setlistSlice = createSlice({
  name: "setlist",
  initialState,
  reducers: {
    updateSetlist: (state, action: PayloadAction<Setlist>) => {
      state.songs = action.payload.songs;
    },
  },
});

export const { updateSetlist } = setlistSlice.actions;
export default setlistSlice.reducer;
