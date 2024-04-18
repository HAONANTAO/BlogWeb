import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";
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
    <main className="flex flex-col max-w-6xl min-h-screen p-3">
      <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-4xl text-center lg:text-5xl">
        {post && post.title}
      </h1>
    </main>
  );
};

export default PostPage;
