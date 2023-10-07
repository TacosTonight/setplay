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
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";

const MainContentArea = () => {
  const { isError, isSuccess, isLoading, mutate } = useCreatePlaylist();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlaylistIsSuccess(isSuccess));
    dispatch(updatePlaylistIsError(isError));
    dispatch(updatePlaylistIsLoading(isLoading));
  }, [isSuccess, isError, isLoading, dispatch]);

  const createPlaylist = async () => {
    try {
      await mutate();
    } catch (error) {
      console.error("Error creating playlist:", error);
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
