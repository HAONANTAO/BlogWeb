import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TextInput, Textarea, Button, Alert } from "flowbite-react";
import axios from "axios";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      alert("Comment cannot be more than 200 characters.");
      return;
    }

    try {
      const data = await axios.post("/api/comment/create", {
        content: comment,
        postId,
        userId: currentUser.data._id,
      });

      console.log(data);
      if (data.statusText !== "OK") {
        console.log("error internal when create comment");
      }
      //success -> clear comment
      setComment("");
      setCommentError(null);
      setCommentSuccess("You are comment it successfully!");
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-3xl p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-xs text-gray-500 ">
          <p>Signed in as: </p>
          <img
            className="object-cover w-5 h-5 rounded-full"
            src={currentUser.data.photoURL}
            alt="currentUser avatar"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline">
            @{currentUser.data.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 my-5 text-sm text-teal-500">
          You must be signed in first to comment
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in{" "}
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="p-3 border border-teal-500 rounded-md"
          onSubmit={handleSubmit}>
          <Textarea
            placeholder="add comment here"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-5">
            <p className="text-xs text-gray-500">
              {200 - comment.length}words remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
          {commentSuccess && (
            <Alert color="success" className="mt-5">
              {commentSuccess}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
