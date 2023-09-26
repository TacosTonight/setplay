import React from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";

type CreateNewProps = {
  artist: string;
};

const CreateNew: React.FC<CreateNewProps> = ({ artist }) => {
  const playlistTitle = `Setplay: ${artist} `;
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
          ></TextField>
        </Grid>
        {/* Replace with Playlist Art */}
        <Grid item>
          <Paper sx={{ height: 300, width: 300 }}></Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateNew;
