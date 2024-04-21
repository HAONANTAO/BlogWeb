import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
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
          "The only true wisdom is in knowing you know nothing. That's the
          beauty of learning; it is an endless ocean, always ready to surprise
          you with its depth and mysteries." <br />
          -- Socrates
          <br />
          人群太吵了，我想更了解你，想听听旷野的风，安静又孤独，踏实和自由
        </p>
        <Link
          to="/search"
          className="text-xs font-bold text-teal-500 sm:text-sm hover:underline">
          View All Post
        </Link>
      </div>

      {/*  callToAction*/}
      <div className="p-3 dark:bg-slate-700">
        <CallToAction></CallToAction>
      </div>

      {/* 9 post cards */}
      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7">
        {posts && posts.length > 0 && (
          <div className="flex-row">
            <h2 className="mb-4 text-4xl font-semibold text-center">
              RecentPosts
            </h2>
            {/* shows 9 posts cards here */}
            <div className="flex flex-row flex-wrap gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post}></PostCard>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <Link
                to="/search"
                className="text-lg text-teal-500 hover:underline">
                View All Posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
