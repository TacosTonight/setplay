import React from "react";
import { Grid, Skeleton } from "@mui/material";
import AlbumDistributionChart from "../AlbumDistributionChart";
import DurationDisplay from "../DurationDisplay";
import AuthButton from "../AuthButton";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const SetlistStats = () => {
  const setlist = useSelector((state: RootState) => state.setlist);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item>
        {setlist.songs.length === 0 ? (
          <Skeleton>
            <DurationDisplay />
          </Skeleton>
        ) : (
          <DurationDisplay />
        )}
      </Grid>
      <Grid item>
        {setlist.songs.length === 0 ? (
          <Skeleton variant="circular">
            <AlbumDistributionChart />
          </Skeleton>
        ) : (
          <AlbumDistributionChart />
        )}
      </Grid>
      <Grid item>
        {setlist.songs.length === 0 ? (
          <Skeleton>
            <AuthButton />
          </Skeleton>
        ) : (
          <AuthButton />
        )}
      </Grid>
    </Grid>
  );
};

export default SetlistStats;
