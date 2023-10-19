import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistMetadata = {
  playlistName: string;
  playlistArt: string;
};

type PlaylistStatus = {
  isSuccess: boolean;
  isError: boolean | null;
  isLoading: boolean;
};

type PlaylistManagement = {
  metadata: PlaylistMetadata;
  status: PlaylistStatus;
};

const initialState: PlaylistManagement = {
  metadata: {
    playlistName: "",
    playlistArt: "",
  },
  status: {
    isSuccess: false,
    isError: false,
    isLoading: false,
  },
};

const playlistManagementSlice = createSlice({
  name: "playlistManagement",
  initialState,
  reducers: {
    updatePlaylistIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.status.isSuccess = action.payload;
    },
    updatePlaylistIsError: (state, action: PayloadAction<boolean | null>) => {
      state.status.isError = action.payload;
    },
    updatePlaylistIsLoading: (state, action: PayloadAction<boolean>) => {
      state.status.isLoading = action.payload;
    },
    updatePlaylistName: (state, action: PayloadAction<string>) => {
      state.metadata.playlistName = action.payload;
    },
    updatePlaylistArt: (state, action: PayloadAction<string>) => {
      state.metadata.playlistArt = action.payload;
    },
  },
});

export const {
  updatePlaylistIsSuccess,
  updatePlaylistIsError,
  updatePlaylistIsLoading,
  updatePlaylistName,
  updatePlaylistArt,
} = playlistManagementSlice.actions;
export default playlistManagementSlice.reducer;
