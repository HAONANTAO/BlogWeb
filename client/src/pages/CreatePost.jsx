import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { app } from "../firebase.js";
const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  // 处理文字编辑器文字颜色
  // const stars = useSelector((state) => state.theme.stars);
  // const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [publishError, setPublishError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError();

    try {
      const data = await axios.post(`/api/post/create`, formData);
      console.log(data);
      if (data.status !== 201) {
        setPublishError(data.message);
      } else {
        setPublishError();

        console.log("Attempting to navigate to", `/post/${data.data.slug}`);
        navigate(`/post/${data.data.slug}`);
      }
    } catch (error) {
      console.log(error.response.data);
      setPublishError(error.response.data);
    }
  };
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please select an image to upload!");
        return;
      }
      setUploading(true);
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setUploading(false);
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevFormData) => ({
              ...prevFormData,
              image: downloadURL,
            }));
          });
          setUploading(false);
        },
      );
    } catch (error) {
      setImageUploadError("image upload failed!");
      setImageUploadProgress(null);
    }
  };

  //code fence for ReactQuill
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      ["code-block"], // 确保这里添加了'code-block'
    ],
  };
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className={`flex flex-col justify-between gap-4 sm:flex-row `}>
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                title: e.target.value,
              }))
            }></TextInput>
          <Select
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: e.target.value,
              }))
            }>
            <option value="uncategorized">Select a category</option>
            <option value="Coding">Coding</option>
            <option value="Love">Love</option>
            <option value="Life">Life</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            pill
            onClick={handleUploadImage}
            disabled={uploading}>
            {imageUploadProgress ? (
              <div className="w-16 h-16 ">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress} %`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError} </Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="object-cover w-full h-72"
          />
        )}
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="write something"
          className="mb-12 text-white h-72"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError} </Alert>}
      </form>
    </div>
  );
};

export default CreatePost;
