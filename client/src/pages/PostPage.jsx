import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { DiDrupal } from "react-icons/di";
import { FaBookOpen, FaQuestion } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import { IoIosClock } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/Comments/CommentSection";
import PostCard from "../components/PostCard";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, serRecentPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`/api/post/getposts?slug=${postSlug}`);
        if (data.statusText !== "OK" || data.status !== 200) {
          setError(true);
          setLoading(false);
          return;
        }
        if (data.statusText === "OK" || data.status === 200) {
          console.log(data.data.posts[0]);
          setPost(data.data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };

    fetchPost();
  }, [postSlug]);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const data = await axios.get("/api/post/getposts?limit=3");
        if (data.statusText === "OK" || data.status === 200) {
          serRecentPost(data.data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  //loading spinner
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="flex flex-col justify-center max-w-6xl min-h-screen p-3 mx-auto ">
      <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-4xl text-center lg:text-5xl">
        {post && post.title}
      </h1>
      {/* click to  search */}
      <Link className="mx-auto" to={`/search?category=${post.category}`}>
        <Button
          color="gray"
          pill
          size="xs"
          className="flex items-center justify-center mt-5 ">
          {/* differ category differ icons */}
          {post.category === "uncategorized" && (
            <FaQuestion className="self-center" />
          )}
          {post.category === "Coding" && <FaComputer className="self-center" />}
          {post.category === "Love" && <GiSelfLove className="self-center" />}
          {post.category === "Life" && <DiDrupal className="self-center" />}
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt="no image upload"
        className="mt-10 p-3 max-h-[600px] w-full object-cover flex items-center "
      />
      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto border-b border-slate-300 text-sx">
        <span className="flex flex-row items-center gap-2 ">
          <IoIosClock />
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="flex flex-row items-center gap-2 italic ">
          <FaBookOpen />
          {post && post.content.length}words
        </span>
      </div>

      {/* dangerouslySetInnerHTML 需要一个对象，该对象有一个名为 __html 的属性，其值是你想要插入到元素中的HTML字符串 
      只能用css来装饰*/}
      <div
        className="w-full max-w-2xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}></div>

      <div className="w-full max-w-4xl mx-auto">{/* <CallToAction /> */}</div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="mt-5 text-xl">Recent articles</h1>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentPost &&
            recentPost.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
