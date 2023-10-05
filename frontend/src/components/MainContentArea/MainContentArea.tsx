import Setlist from "../Setlist";
import SetlistStats from "../SetlistStats";
import { Grid } from "@mui/material";

const MainContentArea = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ height: "86vh" }}
      alignItems="center"
    >
      <Grid item sx={{ flex: 1.5, height: "100%" }}>
        <Setlist />
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        <SetlistStats />
      </Grid>
    </Grid>
  );
};

export default MainContentArea;
