import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EarthCanvas from "../components/Canvas/Earth";
import OAuth from "../components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

const SignIn = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  console.log("content", formData);
  const handleChange = (e) => {
    //keep the original one
    // removing the white space using trim()
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoading(false);
      return dispatch(signInFailure("need fill all information!"));
    }
    //no refresh

    //replace the original fetch method
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   header: { "Content-Type": "application/json" },
    //   body: JSON.JSON.stringify(formData),
    // });
    try {
      //in redux
      dispatch(signInStart());
      const data = await axios.post("/api/auth/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);

      if (data.statusText === "OK" || data.status === 200) {
        setLoading(false);
        //changeURL to /signin
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.response.data.message));
    }
  };
  const [passwordVisible, SetPasswordVisible] = useState("password");
  const changePasswordVisibility = () => {
    SetPasswordVisible(passwordVisible === "text" ? "password" : "text");
  };
  return (
    <>
      <div className="flex flex-col max-w-3xl min-h-screen p-3 mx-auto mt-20 text-white md:flex-row">
        {/* md:items-center */}
        {/* left side */}
        <div className="flex-1 mr-5 text-gray-500 md:items-center">
          <div className="text-4xl font-bold dark:text-white ">
            {/* <Link to="/" className="text-4xl font-bold dark:text-white"> */}
            {/* 渐变三色 */}
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-teal-500 to-lime-500">
              Aaron's
            </span>
            Blog
          </div>
          {/* </Link> */}
          <p className="mt-5 text-sm">
            This is a Personal blog to publish articles. You can login with your
            information.
          </p>
          <div className="w-80 h-80">
            <EarthCanvas />
          </div>
          {/* <img src="/src/assets/image1.png" /> */}
        </div>
        {/* EarthCanvas组件放在左侧div下方 */}
        {/* right side */}
        <div className="flex-1 text-gray-500 ">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div>
              <div className="flex gap-2 ">
                <MdMarkEmailUnread />
                <Label
                  value="Your email"
                  className="text-gray-500 "
                  htmlFor="email"></Label>
              </div>

              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex gap-2">
                <RiLockPasswordFill />
                <Label
                  value="Your password"
                  htmlFor="password"
                  className="text-gray-500 "></Label>
              </div>

              <div className="relative ">
                <TextInput
                  type={passwordVisible}
                  placeholder="xxxxxxxx"
                  id="password"
                  onChange={handleChange}
                />
                <button type="button" onClick={changePasswordVisibility}>
                  <IoEyeSharp className="absolute right-0 w-10 text-black bottom-9" />
                </button>
              </div>
            </div>
            <Button
              disabled={loading}
              gradientDuoTone="tealToLime"
              pill
              className="mt-5"
              type="submit">
              {loading ? (
                <Spinner size="sm">
                  {/* <span className="pl-3">loading...</span> */}
                </Spinner>
              ) : (
                "SignIn"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="gap-2 mt-5 text-xs">
            <span>Have an account? </span>
            <Link to="/sign-up" className="text-purple-500">
              Sign Up
            </Link>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We’ll never share your details. Read our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      {/* <StarsCanvas /> */}
    </>
  );
};

export default SignIn;
