import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="w-full max-w-3xl p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-xs text-gray-500 ">
          <p>Signed in as: </p>
          <img className="object-cover w-5 h-5 rounded-full" src={currentUser.data.photoURL} alt="currentUser avatar" />
          <Link to="/dashboard?tab=profile" className="text-xs text-cyan-600 hover:underline">@{currentUser.data.username}</Link>
        </div>
      ) : (
        <div className="">You must be signed in first to comment
        <Link to="sign-in">Sign in </Link></div>
      )}
      CommentSectionCommentSection
    </div>
  );
};

export default CommentSection;
