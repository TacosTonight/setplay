import { Box, Grid, TextField } from "@mui/material";
import PlaylistArt from "../PlaylistArt";
import { RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updatePlaylistName } from "../../redux/playlistManagementSlice";

const CreateNew = () => {
  const artistName = useSelector((state: RootState) => state.artist.name);
  const playlistTitle = `Setplay // ${artistName}`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlaylistName(playlistTitle));
  }, [artistName]);

  return (
    <Box padding={3}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={2}
      >
        <Grid item>
          <TextField
            fullWidth
            size="small"
            value={playlistTitle}
            label="Playlist Title"
          />
        </Grid>
        <Grid item>
          <PlaylistArt />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateNew;
