import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { setArtistName, setArtistImg } from "../../redux/artistNameSlice";
import {
  updateSetlist,
  updateSetlistIsLoading,
  resetSetlist,
} from "../../redux/setlistSlice";
import { useFetchArtists } from "../../hooks/useFetchArtist";
import { useFetchSetlist } from "../../hooks/useFetchSetlist";
import { useDebounce } from "../../hooks/useDebounce";
import { Artist, isArtist } from "../../types";
import ArtistCard from "../ArtistCard";

const SearchBar = () => {
  const [value, setValue] = React.useState<Artist | null>(null);
  const [artistInput, setArtistInput] = React.useState("");
  const [options, setOptions] = React.useState<readonly Artist[]>([]);
  const debouncedArtistInput = useDebounce(artistInput, 300);
  const handleInputChange = (_e: React.SyntheticEvent, newValue: string) => {
    setArtistInput(newValue);
  };
  const dispatch = useDispatch();

  const handleAutocompleteChange = (
    _e: React.SyntheticEvent,
    newValue: Artist | string | null
  ) => {
    if (isArtist(newValue)) {
      setValue(newValue);
      dispatch(setArtistName(newValue.name));
      dispatch(setArtistImg(newValue.imgUrl));
    }
  };

  const {
    data: artistsData,
    isLoading: artistsIsLoading,
    isError: artistsIsError,
    error: artistsError,
  } = useFetchArtists(debouncedArtistInput);

  useEffect(() => {
    if (artistsIsError) {
      console.error("Error fetching artists:", artistsError);
    } else {
      setOptions(artistsData?.artists || []);
    }
  }, [artistsData, artistsIsError, artistsError, dispatch]);

  const {
    data: setlistData,
    isLoading: setlistIsLoading,
    isError: setlistIsError,
    error: setlistError,
  } = useFetchSetlist(value?.name || "");

  useEffect(() => {
    if (setlistError) {
      console.error("Error fetching setlist:", setlistError);
      dispatch(resetSetlist());
    } else if (setlistData) {
      dispatch(updateSetlist(setlistData));
    }
  }, [setlistData, setlistIsError, setlistError, dispatch]);

  useEffect(() => {
    dispatch(updateSetlistIsLoading(setlistIsLoading));
  }, [setlistIsLoading, dispatch]);

  return (
    <>
      <Autocomplete
        filterOptions={(x) => x}
        autoHighlight
        freeSolo
        value={value}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        getOptionLabel={(option) => (isArtist(option) ? option.name : option)}
        options={options}
        loading={artistsIsLoading}
        renderOption={(props, option) => (
          <li {...props}>
            <ArtistCard artistName={option.name} imageUrl={option.imgUrl} />
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
