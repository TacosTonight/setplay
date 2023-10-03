import { Button, Stack, Typography } from "@mui/material";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import SpotifyLogo from "../../assets/Spotify_Logo_CMYK_Black.png";

const AuthButton = () => {
  const isAuth = useSelector(
    (state: RootState) => state.isAuthToSpotify.isAuth
  );

  return (
    <Stack direction="column" alignItems="center">
      <Button variant="contained">{isAuth ? "Save" : "Login"}</Button>
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
