import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import PlaylistArt from "../PlaylistArt";

type CreateNewProps = {
  artist: string;
};

const CreateNew: React.FC<CreateNewProps> = ({ artist }) => {
  const playlistTitle = `Setplay: ${artist}`;

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
            defaultValue={playlistTitle}
            label="Playlist Title"
          />
        </Grid>
        <Grid item>
          <PlaylistArt artist={artist} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateNew;
