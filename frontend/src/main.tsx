import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./redux";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
//Allows state to be saved when a user goes through the login process but also clears local storage after sometime has passed
const timeSaved = localStorage.getItem("timeSaved");
if (!timeSaved || Date.now() - JSON.parse(timeSaved) >= 600000) {
  localStorage.clear();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
