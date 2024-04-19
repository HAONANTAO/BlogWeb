import React from "react";
import { useSelector } from "react-redux";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser ? <div></div> : <div></div>}
      CommentSectionCommentSection
    </div>
  );
};

export default CommentSection;
