import React from "react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="flex justify-center text-white">
      <h1>Profile</h1>
      <form>
        <img src={currentUser.data.photoURL} alt="Avatar" classN />
      </form>
    </div>
  );
};

export default DashProfile;
