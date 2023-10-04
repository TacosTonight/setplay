import MainContentArea from "./components/MainContentArea";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  // Apply custom CSS to remove margin from body
  document.body.style.margin = "0";
  return (
    <>
      <HeaderComponent />
      <MainContentArea />
    </>
  );
}

export default App;
