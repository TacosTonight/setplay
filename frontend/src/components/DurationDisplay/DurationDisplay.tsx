import React from "react";
import { Grid, Typography } from "@mui/material";

type DurationDisplayProps = {
  numberOfSongs: number;
  milliseconds: number;
};

const DurationDisplay: React.FC<DurationDisplayProps> = ({
  numberOfSongs,
  milliseconds,
}) => {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let displayTime = "";

  if (totalMinutes === 0) {
    displayTime = "0 minutes";
  } else {
    if (hours > 0) {
      displayTime += `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }
    if (minutes > 0) {
      displayTime += ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1">{`Number of songs: ${numberOfSongs}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{`Duration: ${displayTime.trim()}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default DurationDisplay;
