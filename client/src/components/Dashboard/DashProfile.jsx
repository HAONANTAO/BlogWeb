import React from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="justify-center w-full max-w-lg gap-6 mx-auto text-white">
      <h1 className="my-8 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="self-center overflow-hidden rounded shadow-md w-36 h-36 cursor-pointer-">
          <img
            src={currentUser.data.photoURL}
            alt="Avatar"
            className="w-full rounded-full border-2 border-[lightgray] object-cover"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.data.username}></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.email}></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue="******* "></TextInput>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline pill
        className="my-4">
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-3 text-red-500 ">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
