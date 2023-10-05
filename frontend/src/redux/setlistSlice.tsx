import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../types";

const initialState: Setlist = {
  songs: [],
  isLoading: false,
};

const setlistSlice = createSlice({
  name: "setlist",
  initialState,
  reducers: {
    updateSetlist: (state, action: PayloadAction<Setlist>) => {
      state.songs = action.payload.songs;
    },
    updateSetlistIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateSetlist, updateSetlistIsLoading } = setlistSlice.actions;
export default setlistSlice.reducer;
