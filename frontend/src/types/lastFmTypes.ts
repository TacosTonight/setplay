type Image = {
  "#text": string;
  size: string;
};

export type Artist = {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
};

export type ArtistMatches = {
  artist: Artist[];
};

export const isArtist = (obj: any): obj is Artist => {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.listeners === "string" &&
    typeof obj.mbid === "string" &&
    typeof obj.url === "string" &&
    typeof obj.streamable === "string" &&
    Array.isArray(obj.image) &&
    obj.image.every(
      (item: Image) =>
        typeof item["#text"] === "string" && typeof item.size === "string"
    )
  );
};
