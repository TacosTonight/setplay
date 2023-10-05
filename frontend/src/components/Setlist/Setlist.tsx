import { List, ListItem, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import SongItem from "../SongItem";

const Setlist = () => {
  const songs = useSelector((state: RootState) => state.setlist.songs);

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
      {songs.length === 0 ? (
        <Skeleton variant="rounded" width="100%" height="100%"></Skeleton>
      ) : (
        <List sx={{ height: "100%", overflowY: "auto" }}>{renderedSongs}</List>
      )}
    </>
  );
};

export default Setlist;
