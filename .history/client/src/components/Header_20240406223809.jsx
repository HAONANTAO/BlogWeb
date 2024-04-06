import React from "react";
//UI Library
import { Button, Navbar, TextInput } from "flowbite-react";
// router without refresh
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
const Header = () => {
  // 当前的路径
  const path = useLocation().pathname();
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
      {/* 搜索bar */}
      <form>
        <TextInput
          type="text"
          placeholder="searching..."
          rightIcon={AiOutlineSearch}
          // lg size 之上才显示
          className="hidden lg:inline "
        />
      </form>
      {/* 给小屏幕使用的 pill=radius*/}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      {/* 中等md尺寸下的显示顺序 后置*/}
      <div className="flex gap-2 md:order-2">
        <Button className="hidden w-12 h-10 sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          {/* 渐变 */}
          <Button gradientDuoTone="purpleToBlue" pill>
            Sign In
          </Button>
        </Link>
        {/* Navbar.Toggle是小屏幕才显示 配合collapse显示*/}
        <Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        {/* 只在主页面使用 */}
        <Navbar.Link active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
