import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const data = await axios.get(`/api/post/getposts?postId=${postId}`);

        if (data.statusText === "OK") {
          setPublishError(null);
          setFormData(data.data.posts[0]);
        }
        if (data.statusText !== "OK") {
          console.log(data.message);
          setPublishError("fetch data failed");
          return;
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
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
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.put(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        formData,
      );
      console.log("111");
      console.log(data);
      if (data.statusText !== "OK") {
        console.log("1111");
        setPublishError(data.message);
        return;
      }

      if (data.statusText === "OK") {
        console.log("11112");
        setPublishError(null);
        navigate(`/post/${data.data.slug}`);
      }
    } catch (error) {
      console.log("11110");
      setPublishError("Something went wrong when update");
    }
  };
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
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
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: e.target.value,
              }))
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
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="object-cover w-full h-72"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="mb-12 h-72"
          required
          onChange={(value) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              content: value,
            }));
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
