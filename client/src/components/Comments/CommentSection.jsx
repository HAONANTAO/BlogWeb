import axios from "axios";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //in case
    if (commentValue.length > 200) {
      alert("Comment cannot be more than 200 characters.");
      return;
    }

    try {
      const data = await axios.post("/api/comment/create", {
        content: commentValue,
        postId,
        userId: currentUser._id,
      });

      if (data.statusText !== "OK" || data.status !== 200) {
        console.log("error internal when create comment");
      }
      //success -> clear comment
      setCommentValue("");
      setCommentError(null);
      setCommentSuccess("You are comment it successfully!");
      setPostComments([data.data, ...postComments]);
    } catch (error) {
      setCommentError(error.message);
       console.log(error.message);
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
        console.log(error.message);
      }
    };
    getComments();
  }, [postId, postComments]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const data = await axios.put(`/api/comment/likeComment/${commentId}`);

      if (data.statusText === "OK") {
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
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setPostComments((prevComments) =>
      prevComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c,
      ),
    );
    // setPostComments(
    // update the editedContent
    //   postComments.map((c) =>
    //     c.id === comment._id ? { ...c, content: editedContent } :  c ,
    //   ),
    // );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        alert("not sign in");
        navigate("/sign-in");
        return;
      }
      const data = await axios.delete(
        `/api/comment/deleteComment/${commentId}`,
      );
      if (data.status === "OK") {
        //clear comments

        setPostComments((prevComment) => {
          prevComment.map((cmt) => cmt.filter(cmt._id !== commentId));
        });
      }
    } catch (error) {
      setShowModal(false);
    console.log(error.message);
    }
  };
  return (
    <div className="w-full max-w-3xl p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-xs text-gray-500 ">
          <p>Signed in as: </p>
          <img
            className="object-cover w-5 h-5 rounded-full"
            src={currentUser.photoURL}
            alt="currentUser avatar"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline">
            @{currentUser.username}
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
          className="p-3 border border-blue-900 rounded-md"
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
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}></Comment>
          ))}
        </>
      )}
      {/* delete */}
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
              Are you sure to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}>
                Yes,I am sure!
              </Button>
              <Button onClick={() => setShowModal(false)}>No, Cancel it</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
