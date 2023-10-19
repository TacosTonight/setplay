import { useEffect } from "react";
import { Grid } from "@mui/material";
import Setlist from "../Setlist";
import SetlistStats from "../SetlistStats";
import { useDispatch } from "react-redux";
import {
  updatePlaylistIsError,
  updatePlaylistIsSuccess,
  updatePlaylistIsLoading,
} from "../../redux/playlistManagementSlice";
import useRequestWithStatus from "../../hooks/useRequestWithStatus";
import { createPlaylistOnSpotify } from "../../api/api";

const MainContentArea = () => {
  const { loading, success, error, makeRequest } = useRequestWithStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlaylistIsSuccess(success));
    dispatch(updatePlaylistIsError(error));
    dispatch(updatePlaylistIsLoading(loading));
  }, [success, error, loading, dispatch]);

  const createPlaylist = async () => {
    try {
      await makeRequest(createPlaylistOnSpotify, [], "", "");
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
