import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";
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
  console.log(totalUsers);
  useEffect(() => {
    // get Users all infor
    const fetchUsers = async () => {
      const data = await axios.get("/api/user/getusers?limit=5");
      console.log(data);
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
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {/* users part */}
        <div className="flex flex-col w-full gap-4 p-3 border border-gray-700 rounded-md shadow-md users dark:bg-slate-800 md:w-72">
          {/* users */}
          <div className="flex justify-between">
            <h3 className="text-gray-500 uppercase text-md">Total Users</h3>
            <p className="text-2xl">{totalUsers}</p>
            <HiOutlineUserGroup className="text-6xl text-white bg-indigo-800 rounded-full" />
          </div>
          {/* last months users */}
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Months </div>
            <p></p>
          </div>
        </div>

        {/* comments part */}
        <div className="flex flex-col w-full gap-4 p-3 border border-gray-700 rounded-md shadow-md comments dark:bg-slate-800 md:w-72">
          {/* users */}
          <div className="flex justify-between">
            <h3 className="text-gray-500 uppercase text-md">Total Comments</h3>
            <p className="text-2xl">{totalComments}</p>
            <HiAnnotation className="text-6xl text-white bg-purple-600 rounded-full" />
          </div>
          {/* last months users */}
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last Months </div>
            <p></p>
          </div>
        </div>

        {/* posts part */}
        <div className="flex flex-col w-full gap-4 p-3 border border-gray-700 rounded-md shadow-md postsdark:bg-slate-800 md:w-72">
          {/* users */}
          <div className="flex justify-between">
            <h3 className="text-gray-500 uppercase text-md">Total Posts</h3>
            <p className="text-2xl">{totalPosts}</p>
            <HiDocumentText className="text-6xl text-white bg-green-600 rounded-full bg-" />
          </div>

          {/* last months users */}
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last Months </div>
            <p></p>
          </div>
        </div>
      </div>

      {/* all table cards1 */}
      <div className="flex flex-wrap justify-center gap-4 py-3 mx-auto ">
        <div className="flex flex-col w-full p-2 mt-4 border shadow-md border-gray-600rounded-md md:w-auto dark:bg-gray-600 ">
          {/* start of recent users */}
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Users</h1>
            <Button outline pill gradientDuoTone="purpleToPink">
              {/* get all users */}
              <Link to="/dashboard?tab=users">See All</Link>
            </Button>
          </div>
          {/* end of recent users */}
          <div>
            <Table>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={user.photoURL}
                          alt="user photo"
                          className="w-10 h-10 bg-gray-500 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
        {/* all table cards2 */}
        <div className="flex flex-col w-full p-2 mt-4 border border-gray-600 rounded-md shadow-md md:w-auto dark:bg-gray-800">
          {/* start of recent users */}
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Comments</h1>
            <Button outline pill gradientDuoTone="purpleToPink">
              {/* get all users */}
              <Link to="/dashboard?tab=comments">See All</Link>
            </Button>
          </div>
          {/* end of recent users */}
          <div>
            <Table>
              <Table.Head>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className="divide-y">
                    <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>

        {/* all table cards3 */}
        <div className="flex flex-col w-full p-2 mt-4 border border-gray-600 rounded-md shadow-md md:w-auto dark:bg-gray-800">
          {/* start of recent users */}
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Posts</h1>
            <Button outline pill gradientDuoTone="purpleToPink">
              {/* get all users */}
              <Link to="/dashboard?tab=posts">See All</Link>
            </Button>
          </div>

          <div>
            <Table>
              <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt="post image"
                          className="h-12 bg-gray-500 rounded-md w-14"
                        />
                      </Table.Cell>
                      <Table.Cell className="w-96">{post.title}</Table.Cell>
                      <Table.Cell className="w-5">{post.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
