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
    updateIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    updateIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

export const { updateIsSuccess, updateIsError } =
  playlistManagementSlice.actions;
export default playlistManagementSlice.reducer;
