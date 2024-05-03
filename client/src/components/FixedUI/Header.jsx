import axios from "axios";
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice.js";

//UI Library
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { PiAirTrafficControlFill } from "react-icons/pi";
// router without refresh
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleBack, toggleTheme } from "../../redux/theme/themeSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  // 当前的路径
  const path = useLocation().pathname;
  const handleSignOut = async () => {
    signOutStart();
    try {
      const data = await axios.post(`/api/user/signout/${currentUser._id}`);

      if (data.status !== 200) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    // give input value
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    //  border-b-2
    // 取消边框 不好看 bg-代表和下面一个颜色
    <Navbar className="text-gray-300 bg-transparent border-blue-800">
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
      {/* make icon clickable */}
      <form onSubmit={handleSubmit} className="relative w-full lg:w-auto">
        <TextInput
          type="text"
          value={searchTerm}
          placeholder="searching..."
          className="hidden lg:inline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-lg text-gray-500">
          <AiOutlineSearch />
        </button>
      </form>
      {/* 给小屏幕使用的 pill=radius*/}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill type="button">
        <AiOutlineSearch />
      </Button>
      {/* 中等md尺寸下的显示顺序 后置*/}
      <div className="flex gap-2 md:order-2">
        <Button color="blue" pill onClick={() => dispatch(toggleBack())}>
          <BsStars />
        </Button>
        <Button
          onClick={() => dispatch(toggleTheme())}
          className="hidden w-12 h-10 sm:inline"
          color="gray"
          pill>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {/* check redux store */}

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                // this is proxy code
                // img={`/api/image-proxy?url=${encodeURIComponent(
                //   currentUser.photoURL,
                // )}`}
                img={currentUser.photoURL}
                rounded
              />
            }>
            <Dropdown.Header>
              <span className="flex flex-row items-baseline block gap-1 text-sm">
                <CgProfile />
                {currentUser.username}
              </span>
              <span className="flex flex-row items-baseline block gap-1 text-sm">
                <MdOutlineEmail />
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* //redirect to dashboard */}
            <Link to={"/dashboard?tab=profile"}>
              <div className="flex flex-row items-baseline justify-center block gap-1 text-l">
                <PiAirTrafficControlFill />
                Profile
              </div>
            </Link>

            <div className="flex flex-row items-baseline justify-center block gap-1 cursor-pointer text-l">
              <FaSignOutAlt />
              <div onClick={handleSignOut}> SignOut</div>
            </div>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" pill outline>
              Sign In
            </Button>
          </Link>
        )}
        {/* Navbar.Toggle是小屏幕才显示 配合collapse显示*/}
        <Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        {/* 根据当前url的path来亮光 */}
        {/* as={"div"}是因为两个link不可以嵌套 */}
        <Navbar.Link active={path === "/"} as={"div"} className="text-white">
          <Link to="/" className="text-xl text-gray-500">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          className="text-white">
          <Link to="/about" className="text-xl text-gray-500 ">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/projects"}
          as={"div"}
          className="text-white">
          <Link to="/projects" className="text-xl text-gray-500 ">
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
