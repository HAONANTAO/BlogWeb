import React from "react";
import { useSelector } from "react-redux";
function StarsProvider({ children }) {
  const { stars } = useSelector((state) => state.theme);

  return (
    <div className={`${stars ? "stars" : ""}`}>
      <div className={` ${stars ? "text-gray-400 " : ""}  min-h-screen`}>
        {children}
      </div>
    </div>
  );
}

export default StarsProvider;
