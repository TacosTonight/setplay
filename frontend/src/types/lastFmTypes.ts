type Artist = {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: {
    "#text": string;
    size: string;
  }[];
};

export type ArtistMatches = {
  artist: Artist[];
};
