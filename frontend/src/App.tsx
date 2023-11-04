import MainContentArea from "./components/MainContentArea";
import HeaderComponent from "./components/HeaderComponent";
import WelcomeScreen from "./components/WelcomeScreen";
import FadeTransition from "./components/FadeTransition";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./redux";
import { isUserAuthed } from "./api/api";
import { updateIsAuthToSpotify } from "./redux/isAuthToSpotifySlice";
import CreatePlaylistStatus from "./components/CreatePlaylistStatus";
import { Artist, Setlist } from "./types";
import { updateSetlist } from "./redux/setlistSlice";
import { setArtistName, setArtistImg } from "./redux/artistNameSlice";
import { useQueryClient } from "react-query";

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showMainContentArea, setShowMainContentArea] = useState(false);
  const songs = useSelector((state: RootState) => state.artist.name);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const isAuthed = await isUserAuthed();
      dispatch(updateIsAuthToSpotify(isAuthed));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadLocalStorage = () => {
    const localStorageSetlist = localStorage.getItem("setlist");
    const localStorageShowWelcomeScreen =
      localStorage.getItem("showWelcomeScreen");
    const localStorageArtist = localStorage.getItem("artist");

    let setlist: Setlist | null = null;
    let showWelcomeScreen: boolean | null = null;
    let artist: Artist | null = null;

    if (localStorageSetlist !== null && localStorageArtist !== null) {
      setlist = JSON.parse(localStorageSetlist);
      artist = JSON.parse(localStorageArtist);
      if (setlist !== null && artist !== null) {
        dispatch(updateSetlist(setlist));
        dispatch(setArtistName(artist.name));
        dispatch(setArtistImg(artist.imgUrl));
        queryClient.setQueryData(["setlist", artist.name], setlist);
      }
    }
    if (localStorageShowWelcomeScreen !== null) {
      showWelcomeScreen = JSON.parse(localStorageShowWelcomeScreen);
      if (showWelcomeScreen !== null) {
        setShowWelcomeScreen(showWelcomeScreen);
      }
    } else {
      setShowWelcomeScreen(true);
    }
  };

  useEffect(() => {
    checkAuth();
    loadLocalStorage();
  }, []);

  useEffect(() => {
    if (songs) {
      setShowWelcomeScreen(false);
      setShowMainContentArea(true);
    }
  }, [songs]);

  return (
    <>
      <HeaderComponent />
      <FadeTransition
        show={showWelcomeScreen}
        transitionDuration={3000}
        exitTransitionDuration={1000}
      >
        <WelcomeScreen />
      </FadeTransition>
      {showMainContentArea && <MainContentArea />}
      <CreatePlaylistStatus />
    </>
  );
}

export default App;
