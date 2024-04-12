import React from "react";
import { useSelector } from "react-redux";
function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="text-gray-700 bg-white dark:text-gray-200 dark:bg-[rgb(16,23,42)]"></div>
      {children}
    </div>
  );
}

export default ThemeProvider;
