import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="relative w-full group border h-[400px] overflow-hidden rounded-lg sm:w-[360px] border-teal-500 hover:border-2 transition-all duration-300">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post image"
          className="h-[300px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="font-xs semibold text- line-clamp-1">{post.title}</p>
        <span className="text-sm italic">{post.category}</span>
        <Link
          className="absolute z-10 group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md  m-2"
          to={`/post/${post.slug}`}>
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
