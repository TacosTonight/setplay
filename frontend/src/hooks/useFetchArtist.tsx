import { fetchArtists, simulateFetchArtists } from "../api/api";
import { useQuery } from "react-query";
import { ArtistMatches } from "../types";

export const useFetchArtists = (artistInput: string) => {
  const { isLoading, isError, data, error } = useQuery<ArtistMatches, Error>({
    queryKey: ["artists", artistInput],
    queryFn: () => fetchArtists(artistInput),
    enabled: !!artistInput,
    staleTime: Infinity,
  });
  return { isLoading, isError, data, error };
};
