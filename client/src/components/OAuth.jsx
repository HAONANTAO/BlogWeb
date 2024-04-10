import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

const OAuth = () => {
  //redux
  const dispatch = useDispatch();
  //oauth firebase
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleGoogleClick = async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      //take personal google information
      let googleData = {
        email: resultsFromGoogle.user.email,
        name: resultsFromGoogle.user.displayName,
        photoURL: resultsFromGoogle.user.photoURL,
      };

      const res = await axios.post("/api/auth/google", googleData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.statusText === "OK") {
        dispatch(signInSuccess(res));
        navigate("/home");
      }
      console.log(resultsFromGoogle);
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
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
