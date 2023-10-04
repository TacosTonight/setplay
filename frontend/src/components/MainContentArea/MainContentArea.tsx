import Setlist from "../Setlist";
import SetlistStats from "../SetlistStats";
import { Grid } from "@mui/material";

const MainContentArea = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      sx={{ height: "100%" }}
      alignItems="center"
      columnSpacing={-10}
    >
      <Grid item sx={{ flex: 1, overflowY: "auto" }}>
        <Setlist />
      </Grid>
      <Grid item>
        <SetlistStats />
      </Grid>
    </Grid>
  );
};

export default MainContentArea;
