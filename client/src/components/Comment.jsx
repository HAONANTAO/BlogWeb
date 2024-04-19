import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
const Comment = ({ comment, onLike }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(`/api/user/${comment.userId}`);
        if (data.statusText === "OK") {
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
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
        {/* comment content */}
        <div>
          <p className="mb-2 text-gray-500">{comment.content}</p>
        </div>

        {/*  functionality */}
        <div>
          <button
            type="button"
            className="pb-2 text-gray-500 hover:text-blue-500"
            onClick={() => onLike(comment._id)}>
            <FaThumbsUp className="text-sm " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
