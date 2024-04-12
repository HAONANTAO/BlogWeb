import React, { useEffect, useRef, useState } from "react";
import { app } from "../../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();
  console.log(imageFileUploadProgress, imageFileUploadError);
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      //create temp url from file object
      setImageUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be <3MB)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      },
    );
  };
  return (
    <div className="justify-center w-full max-w-lg gap-6 mx-auto text-white">
      <h1 className="my-8 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          ref={filePickerRef}
          hidden
        />

        <div
          className="self-center overflow-hidden rounded shadow-md cursor-pointer w-36 h-36"
          onClick={() => filePickerRef.current.click()}>
          <img
            src={imageUrl ? imageUrl : currentUser.data.photoURL}
            alt="Avatar"
            className="w-full rounded-full border-2 border-[lightgray] object-cover "
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
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          pill
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
