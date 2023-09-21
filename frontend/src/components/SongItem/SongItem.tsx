import React from "react";
import AlbumCard from "../AlbumCard";
import { SongItemProps } from "../../types";
import { Grid, Typography } from "@mui/material";

const SongItem: React.FC<SongItemProps> = ({ title, position, albumUrl }) => {
  const size = 80;
  return (
    <Grid container alignItems="center" sx={{ height: size }}>
      <Grid item>
        <AlbumCard
          position={position}
          albumUrl={albumUrl}
          size={size}
        ></AlbumCard>
      </Grid>
      <Grid item>
        <Typography variant="h2">{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default SongItem;
