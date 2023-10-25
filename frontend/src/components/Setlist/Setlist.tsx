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
        <Skeleton variant="rounded" width="100%" height="100%"></Skeleton>
      ) : songs.length > 0 ? (
        <List sx={{ height: "100%", overflowY: "auto" }}>{renderedSongs}</List>
      ) : (
        <Typography variant="body1">No recent setlist found</Typography>
      )}
    </>
  );
};

export default Setlist;
