/*
 * @Date: 2024-04-21 22:33:31
 * @LastEditors: 陶浩南 14639548+haonantao-aaron@user.noreply.gitee.com
 * @LastEditTime: 2025-03-11 22:08:06
 * @FilePath: /BlogWeb/client/src/components/OAuth.jsx
 */
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";

import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/user/userSlice.js";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleClick = async () => {
    dispatch(signInStart());
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { email, displayName, photoURL } = resultsFromGoogle.user;

      const googleData = {
        email,
        name: displayName,
        photoURL,
      };

      console.log("Google data:", googleData); // 输出日志以确认数据
      const res = await axios.post("/api/auth/google", googleData);

      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      } else {
        dispatch(signInFailure("Login failed"));
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
      <FaGoogle className="mr-2 w-6 h-6" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
