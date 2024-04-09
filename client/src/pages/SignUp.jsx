import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EarthCanvas from "../components/Canvas/Earth";
import axios from "axios";
import StarsCanvas from "../components/Canvas/StarsCanvas";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    //keep the original one
    // removing the white space using trim()
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("need fill all!");
    }
    //no refresh

    //replace the original fetch method
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   header: { "Content-Type": "application/json" },
    //   body: JSON.JSON.stringify(formData),
    // });

    axios
      .post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setErrorMessage(error.errorMessage);
      });
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
                value="Your username"
                className="text-white"
                htmlFor="username"></Label>
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
              gradientDuoTone="tealToLime"
              pill
              className="mt-5"
              type="submit">
              SignUp
            </Button>
          </form>
          <div className="gap-2 mt-5 text-xs">
            <span>Have an account? </span>
            <Link to="/sign-in" className="text-purple-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>{" "}
      </div>{" "}
      {/* <StarsCanvas /> */}
    </>
    // <div className="min-h-screen mt-20">
    //   {/* mx-auto for center */}

    /* </div> */
  );
};

export default SignUp;
