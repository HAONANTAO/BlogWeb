import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EarthCanvas from "../components/Canvas/Earth";
import axios from "axios";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({});
  //跳转
  const navigate = useNavigate();
  useEffect(() => {
    //clear error message
    setErrorMessage();
  }, []);
  const handleChange = (e) => {
    //keep the original one
    // removing the white space using trim()
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("need fill all information!");
    }
    //no refresh
    //replace the original fetch method
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   header: { "Content-Type": "application/json" },
    //   body: JSON.JSON.stringify(formData),
    // });
    try {
      setLoading(true);
      const data = await axios.post("/api/auth/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);
      if (data.statusText === "OK") {
        //changeURL to /signin
        navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      //specfic infor
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex flex-col max-w-3xl min-h-screen p-3 mx-auto mt-20 text-white md:flex-row">
        {/* md:items-center */}
        {/* left side */}
        <div className="flex-1 mr-5 md:items-center">
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
            This is a Personal blog to publish articles. You can signup with
            your information.
          </p>
          <div className="w-80 h-80">
            <EarthCanvas />
          </div>
          {/* <img src="/src/assets/image1.png" /> */}
        </div>
        {/* EarthCanvas组件放在左侧div下方 */}
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label
                value="Your email"
                className="text-white"
                htmlFor="email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                value="Your password"
                htmlFor="password"
                className="text-white"></Label>
              <TextInput
                type="password"
                placeholder="xxxxxxxx"
                id="password"
                onChange={handleChange}
              />
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
          </form>
          <div className="gap-2 mt-5 text-xs">
            <span>Don't have a account? </span>
            <Link to="/sign-up" className="text-purple-500">
              Sign Up
            </Link>
          </div>
          <p
            id="helper-text-explanation"
            class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We’ll never share your details. Read our{" "}
            <a
              href="#"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Privacy Policy
            </a>
            .
          </p>
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
