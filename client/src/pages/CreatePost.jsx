import React from "react";
import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreatePost = () => {
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"></TextInput>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="Coding">Coding</option>
            <option value="Love">Love</option>
            <option value="Life">Life</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            pill>
            Upload Image
          </Button>
        </div>{" "}
        <ReactQuill
          theme="snow"
          placeholder="write something"
          className="mb-12 h-72"
        />
        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
      </form>
    </div>
  );
};

export default CreatePost;
