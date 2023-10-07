import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import SpotifyLogo from "../../assets/Spotify_Logo_CMYK_Black.png";
import PlaylistManagementModal from "../PlaylistManagementModal";

type AuthButtonProps = {
  createPlaylist: () => void;
};

const AuthButton: React.FC<AuthButtonProps> = ({ createPlaylist }) => {
  const isAuth = useSelector(
    (state: RootState) => state.isAuthToSpotify.isAuth
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loginButton = <Button variant="contained">Login</Button>;

  const saveButton = (
    <Button variant="contained" onClick={handleOpen}>
      Save
    </Button>
  );

  return (
    <Stack direction="column" alignItems="center">
      {isAuth ? saveButton : loginButton}
      <PlaylistManagementModal
        open={open}
        onClose={handleClose}
        createPlaylist={createPlaylist}
      />
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="body2">Saving with</Typography>
        <img
          src={SpotifyLogo}
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "4em",
          }}
          alt="Spotify Logo"
        />
      </Stack>
    </Stack>
  );
};

export default AuthButton;
