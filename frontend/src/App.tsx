import CreateNew from "./components/CreateNew";
import SearchBar from "./components/SearchBar";

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  return (
    <>
      {/* <SearchBar></SearchBar> */}
      <CreateNew artist="Artist"></CreateNew>
    </>
  );
}

export default App;
