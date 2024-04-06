import { BrowserRouter, Routes, Route } from "react-router-dom"; //用react-router-dom进行路由
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1>Hello world!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/><Home>}></Route>
          <Route path="/" element={<About/>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
