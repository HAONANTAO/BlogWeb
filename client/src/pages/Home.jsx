import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // first 9 default but 6 is good
      const data = await axios.get("/api/post/getposts?limit=6");

      if (data.statusText === "OK") {
        setPosts(data.data.posts);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {/* introduction part */}
      <div className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28">
        <h1 className="self-center text-3xl font-bold lg:text-6xl">
          Welcome to My Blog!
        </h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          loramAliqua sit sunt aute anim occaecat reprehenderit duis veniam
          esse. Velit proident fugiat magna qui esse enim adipisicing et quis
          mollit. Sint sunt id voluptate nulla labore veniam. Amet non eu eu
          incididunt amet ipsum sit amet. Cupidatat quis aute irure nisi. Et
          mollit ex id incididunt ex sint Lorem laborum.
        </p>
        <Link
          to="/search"
          className="text-xs font-bold text-teal-500 sm:text-sm hover:underline">
          View All Post
        </Link>
      </div>

      {/*  callToAction*/}
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction></CallToAction>
      </div>

      {/* 9 post cards */}
      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7">
        {posts && posts.length > 0 && (
          <div className="">
            <h2 className="text-2xl font-semibold text-center">RecentPosts</h2>
            {/* shows 9 posts cards here */}
            <div className="flex flex-row flex-wrap gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post}></PostCard>
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-center text-teal-500 hover:underline">
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
