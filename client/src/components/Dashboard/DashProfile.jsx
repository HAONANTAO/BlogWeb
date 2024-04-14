import React, { useEffect, useRef, useState } from "react";
import Scene from "../Canvas/Scene.jsx";
import SolarSystem from "../Canvas/SolarSystem.jsx";
import { app } from "../../firebase.js";
import axios from "axios";
//progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserError, setUpdateUserError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);

  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
    }
  }, [imageFile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if not any update
    if (imageUploading) {
      return;
    }
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No change Made");
      return;
    }

    try {
      dispatch(updateStart());

      const data = await axios.put(
        `/api/user/update/${currentUser.data._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (data.statusText !== "OK") {
        //changeURL to /signin

        dispatch(updateFailure(data.message));
        setUpdateUserError(data.error.message);
      } else {
        setUpdateUserSuccess("User'profile update successfully!");
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const uploadImage = async () => {
    setImageUploading(true);
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
        setImageUploading(false);
        setImageFileUploadError("Could not upload image (File must be <3MB)");
        setImageFileUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploading(false);

          setImageUrl(downloadURL);
          //update url
          setFormData({ ...formData, photoURL: downloadURL });
        });
      },
    );
  };
  return (
    <div className="justify-center w-full max-w-lg gap-6 mx-auto text-white">
      <h1 className="my-8 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}{" "}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      <div className="flex items-center justify-center h-64">
        <SolarSystem />
      </div>
    </div>
  );
};

export default DashProfile;
