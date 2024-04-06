import React from "react";
//UI Library
import { Navbar } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      {/* 跳转回Home主页 大于sm size的字体变大*/}
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl">
        <span>Aaron's</span>
        Blog
      </Link>
    </Navbar>
  );
};

export default Header;