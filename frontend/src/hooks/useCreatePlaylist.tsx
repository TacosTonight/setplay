import { simulateSaveRequest } from "../api/api";
import { useMutation } from "react-query";

export const useCreatePlaylist = () => {
  const mutation = useMutation(simulateSaveRequest);
  return mutation;
};
