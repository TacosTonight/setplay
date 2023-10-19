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

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showMainContentArea, setShowMainContentArea] = useState(false);
  const songs = useSelector((state: RootState) => state.artist.name);

  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const isAuthed = await isUserAuthed();
      dispatch(updateIsAuthToSpotify(isAuthed));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
    setShowWelcomeScreen(true);
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
