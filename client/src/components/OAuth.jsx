import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
const OAuth = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleGoogleClick = async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      className="text-white"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}>
      <FaGoogle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
