import { List, ListItem, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import SongItem from "../SongItem";

const Setlist = () => {
  const songs = useSelector((state: RootState) => state.setlist.songs);
  const setlistIsLoading = useSelector(
    (state: RootState) => state.setlist.isLoading
  );

  const renderedSongs = songs.map((song, index) => (
    <ListItem key={index + 1}>
      <SongItem
        title={song.title}
        albumUrl={song.albumArt}
        position={index + 1}
      />
    </ListItem>
  ));

  return (
    <>
      {setlistIsLoading ? (
        <Skeleton
          variant="rounded"
          sx={{
            width: { xs: "95vw", sm: "100%" },
            height: { xs: "90vh", sm: "100%" },
          }}
        ></Skeleton>
      ) : songs.length > 0 ? (
        <List sx={{ width: "100vw", height: "100%", overflowY: "auto" }}>
          {renderedSongs}
        </List>
      ) : (
        <Typography variant="body1">No recent setlist found</Typography>
      )}
    </>
  );
};

export default Setlist;
