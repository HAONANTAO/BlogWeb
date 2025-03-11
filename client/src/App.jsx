// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //用react-router-dom进行路由
//pages
import StarsCanvas from "./components/Canvas/StarsCanvas";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdatePost from "./pages/UpdatePost";
//components
import FooterComponent from "./components/FixedUI/Footer";
import Header from "./components/FixedUI/Header";
import OnlyAdminPrivateRoute from "./components/Utils/OnlyAdminPrivateRoute";
import PrivateRoute from "./components/Utils/PrivateRoute";
import ScrollToTop from "./components/Utils/ScrollToTop";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
//loading animation
import LoadingScreen from "./components/Loading/LoadingScreen";
function App() {
  //loading animation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); //

    //清理函数
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />}></Route>
            <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
          </Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/post/:postSlug" element={<PostPage />}></Route>
        </Routes>
        <FooterComponent />
        <StarsCanvas />
      </BrowserRouter>
    </>
  );
}

export default App;
