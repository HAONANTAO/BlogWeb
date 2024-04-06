import React from "react";
//UI Library
import { Navbar, TextInput } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
import {AiOu}
const Header = () => {
  return (
    <Navbar className="border-b-2">
      {/* 跳转回Home主页 大于sm size的字体变大 黑夜主题字体变白色*/}
      <Link
        to="/"
        className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
        {/* 渐变三色 */}
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Aaron's
        </span>
        Blog
      </Link>
      <form>
        <TextInput type="text" placeholder="searching..."
        rightIcon={} />
      </form>
    </Navbar>
  );
};

export default Header;