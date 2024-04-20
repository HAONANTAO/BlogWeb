import { BrowserRouter, Routes, Route } from "react-router-dom"; //用react-router-dom进行路由
import React, { useState, useEffect } from "react";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StarsCanvas from "./components/Canvas/StarsCanvas";
import Search from "./pages/Search";
import UpdatePost from "./pages/UpdatePost";
//components
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
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
