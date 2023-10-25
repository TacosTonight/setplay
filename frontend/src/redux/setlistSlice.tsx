import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setlist } from "../types";

type SetlistWithLoadingAndUris = Setlist & {
  isLoading: boolean;
  uris: string[];
};

const initialState: SetlistWithLoadingAndUris = {
  songs: [],
  isLoading: false,
  uris: [],
};

const extractUris = (setlist: Setlist): string[] => {
  return setlist.songs
    .filter((song) => song.uri !== "TRACK NOT AVAILABLE")
    .map((song) => song.uri);
};

const setlistSlice = createSlice({
  name: "setlist",
  initialState,
  reducers: {
    updateSetlist: (state, action: PayloadAction<Setlist>) => {
      state.songs = action.payload.songs;
      state.uris = extractUris(action.payload);
    },
    updateSetlistIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetSetlist: () => initialState,
  },
});

export const { updateSetlist, updateSetlistIsLoading, resetSetlist } =
  setlistSlice.actions;
export default setlistSlice.reducer;
