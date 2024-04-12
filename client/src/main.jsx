import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../App.css";
import ThemeProvider from "./components/ThemeProvider.jsx";
//redux
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);
