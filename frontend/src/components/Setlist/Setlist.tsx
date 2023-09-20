import React from "react";
import SongItem from "../SongItem";
import { List, ListItem } from "@mui/material";

type ItemListProps<T> = {
  items: T[];
};

type Song = {
  title: string;
  albumUrl: string;
};

const Setlist: React.FC<ItemListProps<Song>> = ({ items }) => {
  const renderedSongs = items.map((item, index) => (
    <ListItem key={index + 1}>
      <SongItem
        title={item.title}
        albumUrl={item.albumUrl}
        position={index + 1}
      />
    </ListItem>
  ));
  return <List>{renderedSongs}</List>;
};

export default Setlist;
