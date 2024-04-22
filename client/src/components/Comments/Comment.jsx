import axios from "axios";
import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [users, setUsers] = useState({});
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(`/api/user/${comment.userId}`);
        if (data.statusText === "OK" || data.status === 200) {
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    //first display content
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const data = await axios.put(`/api/comment/editComment/${comment._id}`, {
        content: editedContent,
      });
      if (data.statusText === "OK" || data.status === 200) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      setIsEditing(false);
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 text-sm border-b dark:border-gray-600">
      <div className="flex-shrink-0 mr-3">
        <img
          src={users.photoURL}
          alt={users.username}
          className="object-cover w-10 h-10 bg-gray-200 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          {/* might be the username delete account */}
          <span className="mr-1 text-xs font-bold truncate">
            {users ? `@${users.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-600">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
              }}></Textarea>
            {/* 2 buttons */}
            <div className="flex items-center justify-end gap-2 text-sm">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                pill
                onClick={handleSave}>
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToPink"
                outline
                pill
                onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="mb-2 text-gray-500">{comment.content}</p>
            </div>

            {/*  functionality */}
            <div className="flex items-center gap-2 pb-2 border-t border-gray-700 dark:border-gray-700 max-w-fit">
              <button
                type="button"
                className={` text-gray-500 hover:text-blue-500  ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? // important
                      "!text-blue-500"
                    : " "
                }
            `}
                onClick={() => onLike(comment._id)}>
                <FaThumbsUp className="self-center text-sm" />
              </button>
              {/* like */}
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  `${comment.numberOfLikes}    ${
                    comment.numberOfLikes === 1 ? "like" : "likes"
                  }`}
              </p>

              {currentUser &&
                (currentUser._id === comment.userId ||
                  currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500"
                      onClick={handleEdit}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500"
                      onClick={() => onDelete(comment._id)}>
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
        {/* comment content */}
      </div>
    </div>
  );
};

export default Comment;
