import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { FiAlertTriangle } from "react-icons/fi";
import { GiSkullCrossedBones } from "react-icons/gi";
const DashUsers = () => {
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(false);

    const fetchUsers = async () => {
      try {
        const data = await axios.get(`/api/user/getusers`);

        if (data.status === 200) {
          setUsers(data.data.users);
          if (data.data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.data._id, render]);
  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const data = await axios.get(
        `/api/user/getusers?startIndex=${startIndex}`,
      );

      if (data.status === 200) {
        setUsers((prev) => [...prev, ...data.data.users]);
        setSuccess(true);
        if (data.data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const data = await axios.delete(`/api/user/delete/${userIdToDelete}`);
      if (data.status === 200) {
        //filter
        setUsers((user) => user.filter((user) => user._id !== userIdToDelete));
        setRender(true);
        console.log("good delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);
  return (
    <div className="w-full h-full p-3 mx-2 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div>
        {currentUser.data.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <Table.HeadCell>Create Updated</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user) => (
                  <Table.Row
                    key={user.createdAt}
                    className="dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.photoURL}
                        alt={"user photo"}
                        className="object-cover w-12 h-12 bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <TiTick className="text-blue-500" />
                      ) : (
                        <GiSkullCrossedBones className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
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
          <p>You have no users yet.</p>
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
              <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
