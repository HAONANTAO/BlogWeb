import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const DashboardComp = () => {
  const [users, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // get Users all infor
    const fetchUsers = async () => {
      const data = await axios.get("/api/user/getusers?limit=5");
      if (data.statusText === "OK") {
        setUser(data.data.users);
        setTotalUsers(data.data.totalUsers);
        setLastMonthUsers(data.data.lastMonthUsers);
      }
    };

    // get Posts all infor
    const fetchPosts = async () => {
      const data = await axios.get("/api/post/getposts?limit=5");
      if (data.statusText === "OK") {
        setPosts(data.data.posts);
        setTotalPosts(data.data.totalPosts);
        setLastMonthPosts(data.data.lastMonthPosts);
      }
    };

    // get comments all infor
    const fetchComments = async () => {
      const data = await axios.get("/api/comment/getcomments?limit=5");
      if (data.statusText === "OK") {
        setComments(data.data.comments);
        setTotalComments(data.data.totalComments);
        setLastMonthComments(data.data.lastMonthComments);
      }
    };

    if (currentUser.data.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, []);
  return <div></div>;
};

export default DashboardComp;
