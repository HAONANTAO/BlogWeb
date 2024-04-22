import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { app } from "../../firebase.js";
import Scene from "../Canvas/Scene.jsx";
//progress bar
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice.js";
const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserError, setUpdateUserError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, errorMessage, loading } = useSelector(
    (state) => state.user,
  );
  console.log(currentUser);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const filePickerRef = useRef();

  const handleSignOut = async () => {
    signOutStart();
    try {
      const data = await axios.post(`/api/user/signout/${currentUser._id}`);

      if (data.status !== 200) {
        dispatch(signOutFailure(data));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
      dispatch(signOutFailure(error));
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const data = await axios.delete(`/api/user/delete/${currentUser._id}`);

      if (data.status !== 200) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(data);

      if (data.status !== 200) {
        //changeURL to /signin

        dispatch(updateFailure(data.statusText));
        setUpdateUserError("update profile error");
      } else {
        setUpdateUserSuccess("User'profile update successfully!");
        dispatch(updateSuccess(data.data));
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
    <div className="justify-center w-full max-w-lg gap-6 mx-auto text-gray-400">
      <h1 className="my-8 text-3xl font-semibold text-center ">Profile</h1>
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
            src={imageUrl ? imageUrl : currentUser.photoURL}
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
          defaultValue={currentUser.username}
          onChange={handleChange}></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
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
          className="my-2"
          disabled={loading || imageUploading}>
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full">
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-3 text-red-500 ">
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {errorMessage && (
        <Alert color="failure" className="mt-5">
          {errorMessage}
        </Alert>
      )}
      {/* delete user */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="medium">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FiAlertTriangle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes,I am sure!
              </Button>
              <Button onClick={() => setShowModal(false)}>No, Cancel it</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex items-center justify-center h-64 mt-4">
        <Scene />
      </div>
    </div>
  );
};

export default DashProfile;
