import axios from "axios";
import { ArtistMatches } from "../types";

const BASE_URL = "http://ws.audioscrobbler.com/2.0/";
const API_KEY = "702b1cf82c57d671cdbf4fb0a1540a6a";

export const fetchArtists = async (
  artistInput: string
): Promise<ArtistMatches> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: `${API_KEY}`,
        format: "json",
        method: "artist.search",
        artist: artistInput,
      },
    });
    return response.data.results.artistmatches;
  } catch (error) {
    throw error;
  }
};
