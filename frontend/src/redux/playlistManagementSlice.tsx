import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStatus = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
};

const initialState: PlaylistStatus = {
  isSuccess: false,
  isError: false,
  isLoading: false,
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
    updatePlaylistIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  updatePlaylistIsSuccess,
  updatePlaylistIsError,
  updatePlaylistIsLoading,
} = playlistManagementSlice.actions;
export default playlistManagementSlice.reducer;
