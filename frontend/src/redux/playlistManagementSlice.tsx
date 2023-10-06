import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStatus = {
  isSuccess: boolean;
  isError: boolean;
};

const initialState: PlaylistStatus = {
  isSuccess: false,
  isError: false,
};

const playlistManagementSlice = createSlice({
  name: "playlistManagement",
  initialState,
  reducers: {
    updatePlaylistIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    updatePlaylistIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { updatePlaylistIsSuccess, updatePlaylistIsError } =
  playlistManagementSlice.actions;
export default playlistManagementSlice.reducer;
