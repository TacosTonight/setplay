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