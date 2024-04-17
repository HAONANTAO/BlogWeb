import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
          setUserPosts(data.data);
        }
        console.log(data);
      } catch (error) {}
    };
    fetchPosts();
  }, []);
  return <div>sss</div>;
};

export default DashPosts;
