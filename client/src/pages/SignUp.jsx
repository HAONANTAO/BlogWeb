import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    // <div className="min-h-screen mt-20">
    //   {/* mx-auto for center */}
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
          This is a Personal blog to publish articles. You can signup with your
          information.
        </p>
        <img src="/src/assets/image1.png" />
      </div>
      {/* right side */}
      <div className="flex-1">
        <form className="flex flex-col gap-4">
          <div>
            <Label
              value="Your Username"
              className="text-white"
              htmlFor="Username"></Label>
            <TextInput
              type="text"
              placeholder="Username"
              id="Username"
              className=""
            />
          </div>
          <div>
            <Label
              value="Your Email"
              className="text-white"
              htmlFor="Email"></Label>
            <TextInput
              type="text"
              placeholder="name@company.com"
              id="Email"
              className=""
            />
          </div>
          <div>
            <Label
              value="Your Password"
              htmlFor="Password"
              className="text-white"></Label>
            <TextInput type="password" placeholder="xxxxxxxx" id="Password" />
          </div>
          <Button
            gradientDuoTone="tealToLime"
            pill
            className="mt-5"
            type="button">
            SignUp
          </Button>
        </form>
        <div className="gap-2 mt-5 text-xs">
          <span>Have an account? </span>
          <Link to="/sign-in" className="text-purple-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
    /* </div> */
  );
};

export default SignUp;
