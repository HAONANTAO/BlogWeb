import React, { useEffect, useRef, useState } from "react";
import { app } from "../../firebase.js";
//progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
const DashProfile = () => {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [preview, SetPreview] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      //create temp url from file object
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploadError(null);
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
        setImageFileUploadProgress(null);

        setImageUrl(preview); // 直接使用preview，因为preview始终保存着最后一次成功的URL
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          SetPreview(downloadURL);
          setImageUrl(downloadURL);
          //update url
          setFormData({ ...form, photoUrl: downloadURL });
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
          className="relative self-center overflow-hidden rounded shadow-md cursor-pointer w-36 h-36"
          onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth="5"
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                // opacity according to progress
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl ? imageUrl : currentUser.data.photoURL}
            alt="Avatar"
            className={`w-full h-full rounded-full border-2 border-[lightgray] object-fit
            ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-40"
            }`}
          />
        </div>
        {/* alert when error upload image */}
        {imageFileUploadError && (
          <div className="mt-8">
            <Alert color="failure">{imageFileUploadError}</Alert>
          </div>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.data.username}
          onChange={handleChange}></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.email}
          onChange={handleChange}></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue="*******"
          onChange={handleChange}></TextInput>
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
