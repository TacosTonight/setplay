import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArtistState {
  name: string;
  imgUrl: string;
}

const initialState: ArtistState = {
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

export const { setArtistName } = artistSlice.actions;
export default artistSlice.reducer;
