import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { FiAlertTriangle } from "react-icons/fi";
import { GiSkullCrossedBones } from "react-icons/gi";
const DashComments = () => {
  const [commentIdToDelete, setCommentsIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(false);

    const fetchComments = async () => {
      try {
        const data = await axios.get(`/api/comment/getcomments`);

        if (data.status === 200) {
          setComments(data.data.comments);
          if (data.data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
      fetchComments();
    }
  }, [currentUser.data._id, render]);
  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const data = await axios.get(
        `/api/user/getcomments?startIndex=${startIndex}`,
      );

      if (data.status === 200) {
        setComments((prev) => [...prev, ...data.data.comments]);
        setSuccess(true);
        if (data.data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const data = await axios.delete(
        `/api/comment/deleteComment/${commentIdToDelete}`,
      );
      if (data.status === 200) {
        //filter
        setComments((comment) =>
          comment.filter((comment) => comment._id !== commentIdToDelete),
        );
        setRender(true);
        console.log("good delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // overflow-x-scroll scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100
  return (
    <div className="w-full h-full p-3 mx-2 table-auto md:mx-auto dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        {currentUser.data.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {comments.map((comment) => (
                  <Table.Row
                    key={comment.updatedAt}
                    className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setCommentsIdToDelete(comment._id);
                        }}
                        className="font-medium text-red-500 cursor-pointer hover:underline">
                        Delete
                      </span>
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
          <p>You have no comment yet.</p>
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
              Are you sure to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
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

export default DashComments;
