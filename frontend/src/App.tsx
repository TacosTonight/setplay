import SearchBar from "./components/SearchBar";
import Setlist from "./components/Setlist";
import SetlistStats from "./components/SetlistStats";
import { Grid } from "@mui/material";

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  return (
    <>
      <SearchBar />
      <Grid container justifyContent="space-between" sx={{ height: "100%" }}>
        <Grid item sx={{ flex: 1, overflowY: "auto" }}>
          <Setlist />
        </Grid>
        <Grid item>
          <SetlistStats />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
