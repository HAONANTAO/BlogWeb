import React from "react";
//UI Library
import { Navbar } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      {/* 跳转回Home主页 */}
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:">
        <span>Aaron's</span>
        Blog
      </Link>
    </Navbar>
  );
};

export default Header;
