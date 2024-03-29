import { combineReducers, configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistNameSlice";
import setlistReducer from "./setlistSlice";
import isAuthToSpotifyReducer from "./isAuthToSpotifySlice";
import playlistManagementReducer from "./playlistManagementSlice";

const rootReducer = combineReducers({
  artist: artistReducer,
  setlist: setlistReducer,
  isAuthToSpotify: isAuthToSpotifyReducer,
  playlistManagement: playlistManagementReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
