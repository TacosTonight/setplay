import { Button, CircularProgress } from "@mui/material";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";
import { useDispatch } from "react-redux";
import {
  updatePlaylistIsSuccess,
  updatePlaylistIsError,
} from "../../redux/playlistManagementSlice";
import { useEffect } from "react";

const SaveButton = () => {
  const { isError, isSuccess, isLoading, mutateAsync } = useCreatePlaylist();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePlaylistIsSuccess(isSuccess));
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(updatePlaylistIsError(isError));
  }, [isError, dispatch]);

  const handleClick = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const renderButton = (isLoading: boolean) => {
    return isLoading ? (
      <Button
        variant="contained"
        disabled
        endIcon={<CircularProgress size="0.75em" />}
      >
        Save
      </Button>
    ) : (
      <Button variant="contained" onClick={() => handleClick()}>
        Save
      </Button>
    );
  };

  return renderButton(isLoading);
};

export default SaveButton;
