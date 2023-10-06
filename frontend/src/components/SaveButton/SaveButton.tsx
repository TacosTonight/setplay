import { Button, CircularProgress } from "@mui/material";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";

const SaveButton = () => {
  const { isError, isSuccess, isLoading, mutateAsync } = useCreatePlaylist();

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
