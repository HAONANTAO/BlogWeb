import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashComments from "../components/Dashboard/DashComments";
import DashPosts from "../components/Dashboard/DashPosts";
import DashProfile from "../components/Dashboard/DashProfile";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashUsers from "../components/Dashboard/DashUsers";
import DashboardComp from "../components/Dashboard/DashboardComp";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    //search is for get the params after the ?
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    setTab(tabUrl);
    // console.log(tabUrl);
  }, [location.search]);
  return (
    <>
      <div className="flex flex-col min-h-screen text-white md:flex-row">
        {/* sidebar */}
        <div className="md:w-56">
          <DashSidebar />
        </div>
        {/* profile */}
        {tab === "profile" && <DashProfile />}
        {/* posts */}
        {tab === "posts" && <DashPosts />}
        {/* users */}
        {tab === "users" && <DashUsers />}
        {/* comments */}
        {tab === "comments" && <DashComments />}
        {/* DashboardComp */}
        {tab === "dash" && <DashboardComp />}
      </div>
    </>
  );
};

export default Dashboard;
