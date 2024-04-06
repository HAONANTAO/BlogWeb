import React from "react";
//UI Library
import { Navbar } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar className="border-b-2">
      <Link to="/"></Link>
    </Navbar>
  );
};

export default Header;
