import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Textarea, Button, Alert } from "flowbite-react";
import Comment from "../components/Comment";
import axios from "axios";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");
  const navigate = useNavigate();
  console.log(postComments);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //in case
    if (commentValue.length > 200) {
      alert("Comment cannot be more than 200 characters.");
      return;
    }
    console.log(currentUser);
    try {
      const data = await axios.post("/api/comment/create", {
        content: commentValue,
        postId,
        userId: currentUser.data._id,
      });
      console.log(data);
      if (data.statusText !== "OK") {
        console.log("error internal when create comment");
      }
      //success -> clear comment
      setCommentValue("");
      setCommentError(null);
      setCommentSuccess("You are comment it successfully!");
      setPostComments([data.data, ...postComments]);
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await axios.get(`/api/comment/getPostComments/${postId}`);

        if (data.statusText === "OK") {
          setPostComments(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    console.log("object");
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      console.log(commentId);
      const data = await axios.put(`/api/comment/likeComment/${commentId}`);
      console.log(data);

      if (data.statusText === "OK") {
        console.log("object4");
        console.log(postComments);
        //update liked method logic
        setPostComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.data.likes,
                  numberOfLikes: data.data.numberOfLikes,
                }
              : comment,
          ),
        );
      } else {
        console.log(
          "Failed to like comment, response status:",
          response.statusText,
        );
      }
    } catch (error) {
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
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <div className="flex items-center justify-between mt-5">
            <p className="text-xs text-gray-500">
              {200 - commentValue.length}words remaining
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
      {postComments.length === 0 ? (
        <p className="my-5 text-sm">No comments yet</p>
      ) : (
        <>
          <div className="flex items-baseline gap-1 my-5 text-sm">
            <p>Comments</p>
            <div className="px-2 py-1 border border-gray-400 rounded-sm">
              <p>{postComments.length}</p>
            </div>
          </div>
          {postComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}></Comment>
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
