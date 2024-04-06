import React from "react";
//UI Library
import { Navbar } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      {/* 跳转回Home主页 大于sm size的字体变大 黑夜主题字体变白色*/}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        {/* 渐变三色 */}
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
          Aaron's
        </span>
        Blog
      </Link>
    </Navbar>
  );
};

export default Header;
