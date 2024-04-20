import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FiAlertTriangle } from "react-icons/fi";
const DashPosts = () => {
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(false);

    false;
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
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
      fetchPosts();
    }
    //为了解决删除之后不一致显示9个的问题
  }, [currentUser.data._id, render]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const data = await axios.get(
        `/api/post/getposts?userId=${currentUser.data._id}&startIndex=${startIndex}`,
      );

      if (data.status === 200) {
        setUserPosts((prev) => [...prev, ...data.data.posts]);
        setSuccess(true);
        if (data.data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const data = await axios.delete(
        `/api/post/deletepost/${postIdToDelete}/${currentUser.data._id}`,
      );
      if (data.status === 200) {
        //filter
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete),
        );
        setRender(true);
        console.log("good delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full p-3 mx-2 table-auto moverflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
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
                    className="dark:border-gray-700 dark:bg-gray-800">
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
                        className="font-medium dark:text-white"
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

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="medium">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FiAlertTriangle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes,I am sure!
              </Button>
              <Button onClick={() => setShowModal(false)}>No, Cancel it</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
