import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Button } from "flowbite-react";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`/api/post/getposts?slug=${postSlug}`);
        if (data.statusText !== "OK") {
          setError(true);
          setLoading(false);

          return;
        }
        console.log(data.data.posts[0]);
        setPost(data.data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };

    fetchPost();
  }, [postSlug]);

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
        <Button color="gray" pill size="xs" className="self-center mt-5">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt="no image upload"
        className="mt-10 p-3 max-h-[600px] w-full object-cover mx-auto"
      />
      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto border-b border-slate-300 text-sx">
        <span> {post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic"> {post && post.content.length}words</span>
      </div>
      {/* dangerouslySetInnerHTML 需要一个对象，该对象有一个名为 __html 的属性，其值是你想要插入到元素中的HTML字符串 
      只能用css来装饰*/}
      <div
        className="w-full max-w-2xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
    </main>
  );
};

export default PostPage;
