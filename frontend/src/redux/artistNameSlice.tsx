import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArtistState {
  artistName: string;
}

const initialState: ArtistState = {
  artistName: "",
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtistName: (state, action: PayloadAction<string>) => {
      state.artistName = action.payload;
    },
  },
});

export const { setArtistName } = artistSlice.actions;
export default artistSlice.reducer;
