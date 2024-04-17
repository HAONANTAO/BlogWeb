import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await axios.get(
          `/api/post/getposts?userId=${currentUser.data._id}`,
        );
        if (data.statusText === "OK") {
          setUserPosts(data.data.posts);
        }
      } catch (error) {}
    };
    if (currentUser.data.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.data._id]);
  return (
    <div>
      {currentUser.data.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
          </Table.Head>
        </Table>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
};

export default DashPosts;
