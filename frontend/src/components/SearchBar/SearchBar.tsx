import React, { useEffect } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchArtists } from "../../hooks/useFetchArtist";
import { useDebounce } from "../../hooks/useDebounce";
import { Artist, isArtist } from "../../types";
import ArtistCard from "../ArtistCard";

const SearchBar = () => {
  const [value, setValue] = React.useState<Artist | null>(null);
  const [artistInput, setArtistInput] = React.useState("");
  const [options, setOptions] = React.useState<readonly Artist[]>([]);
  const debouncedArtistInput = useDebounce(artistInput, 1000);
  const handleInputChange = (_e: React.SyntheticEvent, newValue: string) => {
    setArtistInput(newValue);
  };

  const handleAutocompleteChange = (
    _e: React.SyntheticEvent,
    newValue: Artist | string | null
  ) => {
    if (isArtist(newValue)) {
      setValue(newValue);
    }
  };

  const { data, isLoading, isError, error } =
    useFetchArtists(debouncedArtistInput);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching artists:", error);
    } else {
      setOptions(data?.artist || []);
    }
  }, [data, isError, error]);

  return (
    <>
      <Autocomplete
        filterOptions={(x) => x}
        freeSolo
        value={value}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        getOptionLabel={(option) => (isArtist(option) ? option.name : option)}
        options={options}
        loading={isLoading}
        renderOption={(props, option) => (
          <li {...props}>
            <ArtistCard
              artistName={option.name}
              imageUrl={option.image[0]["#text"]}
            />
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField>
        )}
      ></Autocomplete>
    </>
  );
};

export default SearchBar;
