import axios from "axios";
import { ArtistMatches, Setlist } from "../types";

const BASE_URL = "http://localhost:8000/spotify/artists";

export const fetchArtists = async (
  artistInput: string
): Promise<ArtistMatches> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
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
      title: "Flourshing",
      albumName: "Step Into The Light",
      albumArt: "https://ia802604.us.archive.org/19/items/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b-35661030081_thumb500.jpg",
      duration: 80000,
      uri: "spotify:track:987654321",
    },
    {
      title: "Dr. Doom",
      albumName: "Continent",
      albumArt: "https://ia801906.us.archive.org/2/items/mbid-826cdc82-de29-4e36-b166-bd421b63b585/mbid-826cdc82-de29-4e36-b166-bd421b63b585-26789784180.jpg",
      duration: 146000,
      uri: "spotify:track:123456789",
    },
    {
      title: "Whoa! Shut It Down",
      albumName: "The Dead Walk",
      albumArt: "https://ia803200.us.archive.org/7/items/mbid-ec3befaf-ad5d-46e6-b5e5-67e1949c003e/mbid-ec3befaf-ad5d-46e6-b5e5-67e1949c003e-26789786488.jpg",
      duration: 178000,
      uri: "spotify:track:234567890",
    },
    {
      title: "4x4",
      albumName: "The Dead Walk",
      albumArt: "https://ia803200.us.archive.org/7/items/mbid-ec3befaf-ad5d-46e6-b5e5-67e1949c003e/mbid-ec3befaf-ad5d-46e6-b5e5-67e1949c003e-26789786488.jpg",
      duration: 146000,
      uri: "spotify:track:345678901",
    },
    {
      title: "Chhinnamasta",
      albumName: "Slow Decay",
      albumArt: "https://ia801707.us.archive.org/7/items/mbid-2b23618b-3698-4dff-8c1a-78263bfe7257/mbid-2b23618b-3698-4dff-8c1a-78263bfe7257-27178361718.jpg",
      duration: 230000,
      uri: "spotify:track:456789012",
    },
    {
      title: "Untended Graves",
      albumName: "Step Into The Light",
      albumArt: "https://ia902604.us.archive.org/19/items/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b-35661030081.jpg",
      duration: 137000,
      uri: "spotify:track:567890123",
    },
    {
      title: "Seeing God",
      albumName: "Slow Decay",
      albumArt: "https://ia801707.us.archive.org/7/items/mbid-2b23618b-3698-4dff-8c1a-78263bfe7257/mbid-2b23618b-3698-4dff-8c1a-78263bfe7257-27178361718.jpg",
      duration: 169000,
      uri: "spotify:track:678901234",
    },
    {
      title: "Chain",
      albumName: "Step Into The Light",
      albumArt: "https://ia902604.us.archive.org/19/items/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b-35661030081.jpg",
      duration: 72000,
      uri: "spotify:track:789012345",
    },
    {
      title: "Fresh Bones",
      albumName: "Step Into The Light",
      albumArt: "https://ia902604.us.archive.org/19/items/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b-35661030081.jpg",
      duration: 149000,
      uri: "spotify:track:890123456",
    },
    {
      title: "Crippling Poison",
      albumName: "Slow Decay",
      albumArt: "https://ia902604.us.archive.org/19/items/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b/mbid-cdb902be-e308-4422-9c31-d9c50cd42e4b-35661030081.jpg",
      duration: 155000,
      uri: "spotify:track:901234567",
    },
    {
      title: "The Beast",
      albumName: "Wormwood",
      albumArt: "https://ia902208.us.archive.org/20/items/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2-31725020539.jpg",
      duration: 244000,
      uri: "spotify:track:012345678",
    },
    {
      title: "Ramirez",
      albumName: "Wormwood",
      albumArt: "https://ia902208.us.archive.org/20/items/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2-31725020539.jpg",
      duration: 146000,
      uri: "spotify:track:1234567890",
    },
    {
      title: "The Hills Have Eyes",
      albumName: "Wormwood",
      albumArt: "https://ia902208.us.archive.org/20/items/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2/mbid-6ae2e405-fc6c-4a7f-9d3b-bac305ab90c2-31725020539.jpg",
      duration: 261000,
      uri: "spotify:track:2345678901",
    },
    {
      title: "Send Help",
      albumName: "Coma Witch",
      albumArt: "https://ia802203.us.archive.org/1/items/mbid-d8af258c-7c0e-4d6b-9ff7-a8c43aaa7630/mbid-d8af258c-7c0e-4d6b-9ff7-a8c43aaa7630-31724662884.jpg",
      duration: 206000,
      uri: "spotify:track:3456789012",
    },
    {
      title: "Carbomb",
      albumName: "3750",
      albumArt: "https://ia902200.us.archive.org/8/items/mbid-ab18ad46-2ed6-4947-8d6e-a941d0faf437/mbid-ab18ad46-2ed6-4947-8d6e-a941d0faf437-31725202612.jpg",
      duration: 78000,
      uri: "spotify:track:4567890123",
    },
  ],
};

export const simulateFetchSetlist = async (_selectedArtist:string): Promise<Setlist> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return exampleSetlist;
};

export const simulateSaveRequest = async (): Promise<string> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return "request completed";
  } catch (error) {
    throw new Error("Error occurred while simulating save request");
  }
};
