import React from "react";
import { Grid, Skeleton } from "@mui/material";
import AlbumDistributionChart from "../AlbumDistributionChart";
import DurationDisplay from "../DurationDisplay";
import AuthButton from "../AuthButton";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const SetlistStats = () => {
  const setlist = useSelector((state: RootState) => state.setlist);
  const renderContent = (component: React.ReactNode, skeletonProps?: any) => {
    return setlist.songs.length === 0 ? (
      <Skeleton {...skeletonProps}>{component}</Skeleton>
    ) : (
      component
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item>{renderContent(<DurationDisplay />)}</Grid>
      <Grid item>
        {renderContent(<AlbumDistributionChart />, { variant: "circular" })}
      </Grid>
      <Grid item>{renderContent(<AuthButton />, { height: 100 })}</Grid>
    </Grid>
  );
};

export default SetlistStats;
