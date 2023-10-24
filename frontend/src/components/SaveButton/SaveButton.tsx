import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

type SaveButtonProps = {
  createPlaylist: () => void;
};

const SaveButton: React.FC<SaveButtonProps> = ({ createPlaylist }) => {
  const isLoading = useSelector(
    (state: RootState) => state.playlistManagement.status.isLoading
  );
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
      <Button variant="contained" onClick={createPlaylist}>
        Save
      </Button>
    );
  };

  return renderButton(isLoading);
};

export default SaveButton;
