import axios from "axios";
import { ArtistMatches } from "../types";

const BASE_URL = "";

export const fetchArtists = async (
  artistInput: string
): Promise<ArtistMatches> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        format: "json",
        method: "artist.search",
        artist: artistInput,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};