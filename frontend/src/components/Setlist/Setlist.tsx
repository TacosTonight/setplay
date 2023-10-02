import { useEffect, useState } from "react";
import { List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Song } from "../../types";
import SongItem from "../SongItem";

const Setlist = () => {
  const setlistFromStore = useSelector(
    (state: RootState) => state.setlist.songs
  );
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    setSongs(setlistFromStore);
  }, [setlistFromStore]);

  const renderedSongs = songs.map((song, index) => (
    <ListItem key={index + 1}>
      <SongItem
        title={song.title}
        albumUrl={song.albumArt}
        position={index + 1}
      />
    </ListItem>
  ));

  return <List>{renderedSongs}</List>;
};

export default Setlist;
