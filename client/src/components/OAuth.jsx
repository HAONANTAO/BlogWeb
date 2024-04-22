import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";

import { signInFailure, signInSuccess } from "../redux/user/userSlice.js";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleClick = async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { email, displayName, photoURL } = resultsFromGoogle.user;

      const googleData = {
        email: email,
        name: displayName,
        photoURL: photoURL,
      };

      const res = await axios.post("/api/auth/google", googleData);

      if (res.status === 200) {
        // Check response status, not statusText
        dispatch(signInSuccess(res.data)); // Assuming res.data contains user data
        navigate("/");
      } else {
        dispatch(signInFailure("Login failed")); // Provide a generic message
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      dispatch(signInFailure("An error occurred during login"));
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
