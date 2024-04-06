import React from "react";
//UI Library
import { Button, Navbar, TextInput } from "flowbite-react";
// router without refresh
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
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
      <div>
        <Button className="hidden w-12 h-10 sm:inline" colo>
          <FaMoon />
        </Button>
      </div>
    </Navbar>
  );
};

export default Header;
