import React from "react";
import AlbumCard from "../AlbumCard";
import { useTheme } from "@mui/material/styles";
import { SongItemProps } from "../../types";
import { Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const SongItem: React.FC<SongItemProps> = ({ title, position, albumUrl }) => {
  const size = 80;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container alignItems="center" columnSpacing={1} sx={{ height: size }}>
      <Grid item>
        <AlbumCard
          position={position}
          albumUrl={albumUrl}
          size={size}
        ></AlbumCard>
      </Grid>
      <Grid item xs={4} md={10}>
        <Typography noWrap variant={small ? "h5" : "body1"}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SongItem;
