import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await axios.get(
          `/api/post/getposts?userId=${currentUser.data._id}`,
        );

        if (data.status === 200) {
          setUserPosts(data.data.posts);
          if (data.data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {}
    };
    if (currentUser.data.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.data._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    console.log("object");
    try {
      const data = await axios.get(
        `/api/post/getposts?userId=${currentUser.data._id}&startIndex=${startIndex}`,
      );
      console.log(data);
      if (data.status === 200) {
        setUserPosts((prev) => [...prev, ...data.data.posts]);
        if (data.data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full mx-3 table-auto moverflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        {currentUser.data.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {userPosts.map((post) => (
                  <Table.Row
                    key={post.createdAt}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-20 h-10 bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 cursor-pointer hover:underline">
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {showMore && (
              <button
                className="self-center w-full text-sm text-teal-500 py-7"
                onClick={handleShowMore}>
                Show More
              </button>
            )}
          </>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashPosts;
