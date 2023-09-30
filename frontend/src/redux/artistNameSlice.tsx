import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArtistState {
  name: string;
}

const initialState: ArtistState = {
  name: "",
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtistName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setArtistName } = artistSlice.actions;
export default artistSlice.reducer;
