import React from "react";
//UI Library
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { PiAirTrafficControlFill } from "react-icons/pi";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
// router without refresh
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  // 当前的路径
  const path = useLocation().pathname;
  return (
    //  border-b-2
    // 取消边框 不好看 bg-代表和下面一个颜色
    <Navbar className="text-white border-blue-800 bg-">
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
        {/* 渐变 */}
        {/* check redux store */}

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                img={currentUser.data.photoURL}
                rounded
              />
              // img={`/api/image-proxy?url=${encodeURIComponent(
              //     currentUser.data.photoURL,
              //   )}`}
            }>
            <Dropdown.Header>
              <span className="flex flex-row items-baseline block gap-1 text-sm">
                <CgProfile />
                {currentUser.data.username}
              </span>
              <span className="flex flex-row items-baseline block gap-1 text-sm">
                <MdOutlineEmail />
                {currentUser.data.email}
              </span>
            </Dropdown.Header>
            {/* //redirect to dashboard */}
            <Link to={"/dashboard?tab=profile"}>
              <div className="flex flex-row items-baseline justify-center block gap-1 text-l">
                <PiAirTrafficControlFill />
                Profile
              </div>{" "}
            </Link>

            <Link to={"/sign-out?tab=profile"}>
              <div className="flex flex-row items-baseline justify-center block gap-1 text-l">
                <FaSignOutAlt />
                SignOut
              </div>{" "}
            </Link>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" pill outline>
              Sign In
            </Button>{" "}
          </Link>
        )}
        {/* Navbar.Toggle是小屏幕才显示 配合collapse显示*/}
        <Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        {/* 根据当前url的path来亮光 */}
        {/* as={"div"}是因为两个link不可以嵌套 */}
        <Navbar.Link active={path === "/"} as={"div"} className="text-white">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className="text-white">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/projects"}
          as={"div"}
          className="text-white">
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
