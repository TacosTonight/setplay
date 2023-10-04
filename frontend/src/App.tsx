import MainContentArea from "./components/MainContentArea";
import SearchBar from "./components/SearchBar";

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  return (
    <>
      <SearchBar />
      <MainContentArea />
    </>
  );
}

export default App;
