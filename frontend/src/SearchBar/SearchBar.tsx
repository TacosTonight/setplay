import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchArtists } from "../hooks/useFetchArtist";
import React from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const [artistInput, setArtistInput] = React.useState("");
  const debouncedArtistInput = useDebounce(artistInput, 1000);

  const { data, isLoading, isError, error } =
    useFetchArtists(debouncedArtistInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistInput(e.target.value);
  };

  return (
    <>
      <div>SearchBar</div>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          type: "search",
        }}
        variant="standard"
        value={artistInput}
        onChange={handleInputChange}
      />
      <div>{isLoading}</div>
      <div>{isError}</div>
      {data && (
        <div>
          <ul>
            {data.artist.map((fruit, index) => (
              <li key={index}>{fruit.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBar;
