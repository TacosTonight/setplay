import axios from "axios";
import { ArtistMatches, Setlist } from "../types";

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

const exampleArtistMatches: ArtistMatches = {
  artists: [
    {
      name: "Artist 1",
      imgUrl: "/demoimage.jpeg",
    },
    {
      name: "Artist 2",
      imgUrl: "/demoimage.jpeg",
    },
  ],
};

export const simulateFetchArtists = async (_artistInput:string): Promise<ArtistMatches> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return exampleArtistMatches;
};


const exampleSetlist: Setlist = {
  songs: [
    {
      title: "Song 1",
      albumName: "Album 1",
      albumArt: "https://example.com/album1.jpg",
      duration: 240000,
      uri: "spotify:track:123456789",
    },
    {
      title: "Song 2",
      albumName: "Album 2",
      albumArt: "https://example.com/album2.jpg",
      duration: 180000,
      uri: "spotify:track:987654321",
    },
  ],
};

export const simulateFetchSetlist = async (_selectedArtist:string): Promise<Setlist> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return exampleSetlist;
};
