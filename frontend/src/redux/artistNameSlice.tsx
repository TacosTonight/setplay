import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../types";

const initialState: Artist = {
  name: "",
  imgUrl: "",
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtistName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setArtistImg: (state, action: PayloadAction<string>) => {
      state.imgUrl = action.payload;
    },
  },
});

export const { setArtistName, setArtistImg } = artistSlice.actions;
export default artistSlice.reducer;
