import { List, ListItem } from "@mui/material";
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

  return <List sx={{ height: "86vh" }}>{renderedSongs}</List>;
};

export default Setlist;
