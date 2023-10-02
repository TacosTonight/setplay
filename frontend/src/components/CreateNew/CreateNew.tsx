import { useEffect, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import PlaylistArt from "../PlaylistArt";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const CreateNew = () => {
  const artistName = useSelector((state: RootState) => state.artist.name);
  const [playlistTitle, setPlaylistTitle] = useState("");
  useEffect(() => {
    setPlaylistTitle(`Setplay: ${artistName}`);
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
          <PlaylistArt artist={artistName} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateNew;
