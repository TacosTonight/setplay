import { fetchSetlist } from "../api/api";
import { useQuery } from "react-query";
import { Setlist } from "../types";

export const useFetchSetlist = (selectedArtist: string) => {
  const { isLoading, isError, data, error } = useQuery<Setlist, Error>({
    queryKey: ["setlist", selectedArtist],
    queryFn: () => fetchSetlist(selectedArtist),
    enabled: !!selectedArtist,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return { isLoading, isError, data, error };
};
