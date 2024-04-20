import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import axios from "axios";
import { MdCollectionsBookmark } from "react-icons/md";
import { TfiComments } from "react-icons/tfi";
import { IoAccessibilitySharp } from "react-icons/io5";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../../redux/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    signOutStart();
    try {
      const data = await axios.post(
        `/api/user/signout/${currentUser.data._id}`,
      );

      if (data.status !== 200) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    //search is for get the params after the ?
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    setTab(tabUrl);
  }, [location.search]);

  return (
    <Sidebar className="w-full text-white md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.data.isAdmin === true ? "Admin" : "User"}
            labelColor="blue"
            href="/dashboard?tab=profile">
            Profile
          </Sidebar.Item>

          {currentUser.data.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={MdCollectionsBookmark}
                as="div">
                Post
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.data.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={IoAccessibilitySharp}
                as="div">
                Users
              </Sidebar.Item>
            </Link>
          )}

          {/* comments */}
          {currentUser.data.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                icon={TfiComments}
                as="div">
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
