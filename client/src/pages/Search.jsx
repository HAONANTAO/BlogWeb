import React, { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
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

  const location = useLocation();

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

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    const data = await axios.get(`/api/post/getposts?${searchQuery}`);

    if (data.statusText === "OK") {
      setPosts([...posts, ...data.data.posts]);
      if (data.data.posts.length >= 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
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

      {/* posts */}
      <div className="w-full">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-gray-500 sm:border-b">
          Post Results
        </h1>
        {/* real result */}
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500"> No Posts Found.</p>
          )}
          {/* can add loading! */}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}

          {/* here display 9 becasue is the main posts page */}
          {!loading &&
            posts &&
            posts.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          {showMore && (
            <button
              className="w-full text-lg text-teal-500 hover:underline p-7"
              onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
