import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // first 9 default but 6 is good
      const data = await axios.get("/api/post/getposts?limit=6");

      if (data.status === 200) {
        setPosts(data.data.posts);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {/* introduction part */}
      <div className="flex flex-col gap-6 px-3 py-20 mx-auto max-w-6xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          Discover Ideas, Stories & Insights
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-gray-600 sm:text-base">
          Welcome to my blog—a place where thoughts take shape, ideas flow, and
          stories unfold. Dive into the latest articles and join the
          conversation.
        </p>
        <blockquote className="text-sm italic text-gray-500 sm:text-base">
          The only true wisdom is in knowing you know nothing. – Socrates
        </blockquote>
        <Link
          to="/search"
          className="text-sm font-semibold text-teal-600 hover:underline">
          Browse All Posts →
        </Link>
      </div>

      {/*  callToAction*/}
      <div className="p-3 dark:bg-slate-700">
        <CallToAction></CallToAction>
      </div>

      {/* 9 post cards */}
      <div className="flex flex-col gap-8 p-3 py-7 mx-auto max-w-6xl">
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
