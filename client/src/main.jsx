import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../App.css";
import ThemeProvider from "./components/ThemeProvider.jsx";

//redux
import { useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
        <App />
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
