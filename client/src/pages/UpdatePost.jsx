import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "flowbite-react";
import { app } from "../firebase.js";
const UpdatePost = () => {
  const { postId } = useParams();
  // 处理文字编辑器文字颜色
  // const stars = useSelector((state) => state.theme.stars);
  // const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const data = await axios.get(`/api/post/getposts?postId=${postId}`);

        if (data.status === 200) {
          //first one
          setFormData(data.data.posts[0]);
        } else {
          publishError(data.statusText);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);
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
            setFormData({ ...formData, image: downloadURL });
          });
          setUploading(false);
        },
      );
    } catch (error) {
      setImageUploadError("image upload failed!");
      setImageUploadProgress(null);
    }
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
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ""}></TextInput>
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}>
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
          placeholder="write something"
          className="mb-12 text-white h-72"
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content || ""}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError} </Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
