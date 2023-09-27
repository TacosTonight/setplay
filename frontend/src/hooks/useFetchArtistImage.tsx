import { simulateApiRequest } from "../api/api";
import { useQuery } from "react-query";

export const useFetchArtistImage = (artist: string) => {
  const { isLoading, isError, data, error } = useQuery<string, Error>({
    queryKey: ["artistImg", artist],
    queryFn: () => simulateApiRequest(artist),
  });
  return { isLoading, isError, data, error };
};
