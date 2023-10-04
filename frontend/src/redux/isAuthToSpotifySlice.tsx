import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isAuth: boolean } = {
  isAuth: true,
};

const isAuthToSpotifySlice = createSlice({
  name: "isAuthToSpotify",
  initialState,
  reducers: {
    updateIsAuthToSpotify: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { updateIsAuthToSpotify } = isAuthToSpotifySlice.actions;
export default isAuthToSpotifySlice.reducer;
