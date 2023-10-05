export type AlbumCardProps = {
  position: number;
  albumUrl: string;
  size: number;
};

export type SongItemProps = {
  title: string;
  position: number;
  albumUrl: string;
};

export type SongItemPropsWithAlbum = SongItemProps & Pick<AlbumCardProps, 'position' | 'albumUrl'>;

export type ArtistCardProps = {
  artistName: string;
  imageUrl: string;
};

export type Song = {
  title: string;
  albumName: string;
  albumArt: string;
  duration: number;
  uri: string;
};

export type Setlist = {
  songs: Song[];
  isLoading: boolean;
}

export type Artist = {
  name: string;
  imgUrl: string;
}

export type ArtistMatches = {
  artists: Artist[];
}

export const isArtist = (obj: any): obj is Artist => {
  return (
    obj &&
    typeof obj.name === "string" &&
    typeof obj.imgUrl === "string"
  );
};