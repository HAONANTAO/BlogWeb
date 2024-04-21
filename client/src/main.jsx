import React from "react";
import ReactDOM from "react-dom/client";
import "../App.css";
import App from "./App.jsx";
import StarsProvider from "./components/Providers/StarsProvider.jsx";
import ThemeProvider from "./components/Providers/ThemeProvider.jsx";
//redux
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

const RootComponent = () => {
  // 使用 useSelector 获取主题状态
  const stars = useSelector((state) => state.theme.stars);

  return (
    <PersistGate persistor={persistor}>
      {stars === false ? (
        <ThemeProvider>
          <App />
        </ThemeProvider>
      ) : (
        <StarsProvider>
          <App />
        </StarsProvider>
      )}
    </PersistGate>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </React.StrictMode>,
);
