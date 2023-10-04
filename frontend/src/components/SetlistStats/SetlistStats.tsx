import React from "react";
import { Grid } from "@mui/material";
import AlbumDistributionChart from "../AlbumDistributionChart";
import DurationDisplay from "../DurationDisplay";
import AuthButton from "../AuthButton";

const SetlistStats = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item>
        <DurationDisplay />
      </Grid>
      <Grid item sx={{ marginLeft: "5.9375em" }}>
        <AlbumDistributionChart />
      </Grid>
      <Grid item sx={{ marginLeft: "0.28125em" }}>
        <AuthButton />
      </Grid>
    </Grid>
  );
};

export default SetlistStats;
