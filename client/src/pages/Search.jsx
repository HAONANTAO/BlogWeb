import React, { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  console.log(sidebarData);
  const location = useLocation();
  console.log(sidebarData);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const data = await axios.get(`/api/post/getposts?${searchQuery}`);
      setLoading(false);
      if (data.statusText !== "OK") {
        return;
      }
      // okk
      if (data.statusText === "OK") {
        setPosts(data.data.posts);
        if (data.data.posts.length >= 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);
  const handleChange = (e) => {
    // 3 situations
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      setSidebarData({ ...sidebarData, sort: e.target.value });
    }
    if (e.target.id === "category") {
      setSidebarData({ ...sidebarData, category: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b border-gray-500 p-7 md:border-r md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/*  Search Term */}
          <div className="flex items-baseline gap-2">
            <label className="font-semibold whitespace-nowrap" for="searchTerm">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}></TextInput>
          </div>
          {/* sort */}
          <div className="flex items-baseline gap-2">
            <label className="font-semibold " for="">
              Sort:
            </label>
            <Select id="sort" onChange={handleChange} value={sidebarData.sort}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          {/* category */}
          <div className="flex items-baseline gap-2">
            <label className="font-semibold " for="">
              Category:
            </label>
            <Select
              id="category"
              onChange={handleChange}
              value={sidebarData.category}>
              <option value="uncategorized">uncategorized</option>
              <option value="Life">Life</option>
              <option value="Love">Love</option>
              <option value="Coding">Coding</option>
            </Select>
          </div>
          <Button type="submit" outline pill gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
