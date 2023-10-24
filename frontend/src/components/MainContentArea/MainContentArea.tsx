import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Setlist from "../Setlist";
import SetlistStats from "../SetlistStats";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlaylistIsError,
  updatePlaylistIsSuccess,
  updatePlaylistIsLoading,
} from "../../redux/playlistManagementSlice";
import { createPlaylistOnSpotify } from "../../api/api";
import { RootState } from "../../redux";
import useRequestWithStatus from "../../hooks/useRequestWithStatus";

const MainContentArea = () => {
  const { loading, success, error, makeRequest } = useRequestWithStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlaylistIsSuccess(success));
    dispatch(updatePlaylistIsError(error));
    dispatch(updatePlaylistIsLoading(loading));
  }, [success, error, loading, dispatch]);

  const uris = useSelector((state: RootState) => state.setlist.uris);
  const playlistName = useSelector(
    (state: RootState) => state.playlistManagement.metadata.playlistName
  );

  const playlistArt = useSelector(
    (state: RootState) => state.playlistManagement.metadata.playlistArt
  );

  const createPlaylist = async () => {
    try {
      await makeRequest(
        createPlaylistOnSpotify,
        uris,
        playlistName,
        playlistArt
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ height: "86vh" }}
      alignItems="center"
    >
      <Grid item sx={{ flex: 1.5, height: "100%" }}>
        <Setlist />
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        <SetlistStats createPlaylist={createPlaylist} />
      </Grid>
    </Grid>
  );
};

export default MainContentArea;
