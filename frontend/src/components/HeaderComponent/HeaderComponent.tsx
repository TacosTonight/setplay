import { Grid, Typography } from "@mui/material";
import SearchBar from "../SearchBar";

const HeaderComponent = () => {
  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      columnSpacing={2}
    >
      <Grid item>
        <Typography variant="h4">Setplay</Typography>
      </Grid>
      <Grid item xs={6} sx={{ flexGrow: 1 }}>
        <SearchBar></SearchBar>
      </Grid>
    </Grid>
  );
};

export default HeaderComponent;
