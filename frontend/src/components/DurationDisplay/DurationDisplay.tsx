import { Grid, Typography } from "@mui/material";
import { Setlist } from "../../types";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const calculateTotalDuration = (setlist: Setlist) => {
  let totalDuration = 0;

  setlist.songs.forEach((song) => {
    totalDuration += song.duration;
  });

  return totalDuration;
};

const DurationDisplay = () => {
  const setlist = useSelector((state: RootState) => state.setlist);
  const milliseconds = calculateTotalDuration(setlist);
  const numberOfSongs = setlist.uris.length;
  const totalNumberOfSongs = setlist.songs.length;
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
        <Typography variant="body1">{`Available songs: ${numberOfSongs}/${totalNumberOfSongs}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{`Duration: ${displayTime.trim()}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default DurationDisplay;
